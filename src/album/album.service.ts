import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { format } from 'date-fns';
import { paginationHandler } from '../utils/pagination.handler';
import { Album } from './entity/album.entity';
import { PhotoService } from '../photo/photo.service';
import { pageRenderHandler } from '../utils/page-render.handler';
import { User } from '../user/entity/user.entity';
import { AlbumWithPhotos } from '../types';
import { CustomInternalServerException } from '../exceptions/custom-internal-server.exception';
import { CustomBadRequestException } from '../exceptions/custom-bad-request.exception';
import { CustomNotFoundException } from '../exceptions/custom-not-found.exception';
import { generateSlugHandler } from '../utils/generate-slug.handler';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => PhotoService))
    private readonly photoService: PhotoService,
  ) {}

  async getAllAlbums(res: Response, user: User, currentPage: number) {
    const maxPerPage = 10;
    const [albums, count]: [AlbumWithPhotos[], number] =
      await Album.findAndCount({
        relations: ['photos'],
        order: {
          createdAt: 'DESC',
        },
        skip: maxPerPage * (currentPage - 1),
        take: maxPerPage,
      });
    const pagesCount = Math.ceil(count / maxPerPage);
    const fixedDateAlbums = albums.map((album) => {
      const { slug, title, createdAt, numberOfPhotos, photos } = album;
      return {
        slug,
        title,
        numberOfPhotos,
        createdAt: format(createdAt, 'dd.MM.yyyy'),
        firstImg: photos[photos.length - 1],
      };
    });
    pageRenderHandler(
      res,
      user,
      'album/list-all',
      { albums: fixedDateAlbums },
      {
        paginationSettings: paginationHandler(currentPage, pagesCount, 'album'),
      },
    );
  }

  async getOneAlbum(res: Response, user: User, slug: string) {
    const album: AlbumWithPhotos = await Album.findOne({
      relations: ['photos'],
      where: {
        slug,
      },
    });

    if (!album) {
      throw new CustomNotFoundException('Album nie został odnaleziony.');
    }
    const fixedDateAlbum = {
      ...album,
      createdAt: format(album.createdAt, 'dd.MM.yyyy'),
    };
    pageRenderHandler(res, user, 'album/list-one', { album: fixedDateAlbum });
  }

  async getAddAlbumPage(res: Response, user: User) {
    pageRenderHandler(res, user, 'album/add');
  }

  async getEditAlbumPage(res: Response, user: User, slug: string) {
    const album: AlbumWithPhotos = await Album.findOne({
      relations: ['photos'],
      where: {
        slug,
      },
    });

    if (!album) {
      throw new CustomNotFoundException('Album nie został odnaleziony.');
    }
    const fixedDateAlbum = {
      ...album,
      createdAt: format(album.createdAt, 'dd.MM.yyyy'),
    };

    pageRenderHandler(
      res,
      user,
      'album/edit',
      { item: fixedDateAlbum },
      { pageName: 'album' },
    );
  }

  async addOrEdit(
    req: Request,
    res: Response,
    user: User,
    fileNames: string[],
    editingAlbumSlug?: string,
  ) {
    const album = editingAlbumSlug
      ? await Album.findOneOrFail({ where: { slug: editingAlbumSlug } })
      : new Album();
    try {
      const newTitle = JSON.parse(JSON.stringify(req.body)).title;

      if (editingAlbumSlug) {
        if (album.title !== newTitle) {
          album.slug = generateSlugHandler(newTitle);
          album.title = newTitle;
        }
      }
      if (!editingAlbumSlug) album.title = newTitle;
      album.numberOfPhotos = editingAlbumSlug
        ? album.numberOfPhotos + fileNames.length
        : fileNames.length;
      await album.save();
      await Promise.all(
        fileNames.map(async (fileName) => {
          await this.photoService.add(fileName, album);
        }),
      );

      return pageRenderHandler(
        res,
        user,
        'album/success',
        {
          message: editingAlbumSlug
            ? 'Zapisano zmiany'
            : 'Pomyślnie dodano nowy album',
        },
        { slug: album.slug },
      );
    } catch (e) {
      try {
        if (fileNames.length > 0) {
          await Promise.all(
            fileNames.map(async (fileName) => {
              await this.photoService.delete(
                res,
                fileName,
                album.slug,
                false,
                e,
              );
            }),
          );
        }
        const brokenAlbum = await Album.findOne({
          where: { id: album.id },
        });

        if (brokenAlbum) await brokenAlbum.remove();
      } catch (e2) {
        console.error(e2);
        throw new CustomInternalServerException(
          'Podczas usuwania pliku wystąpił błąd.',
        );
      }
      throw new InternalServerErrorException(e);
    }
  }

  async editOrDecreaseNumberOfPhotos(
    slug: string,
    newValue?: number,
  ): Promise<void> {
    const album = await Album.findOne({ where: { slug } });
    if (!album)
      throw new CustomNotFoundException('Album nie został odnaleziony.');
    if (newValue) {
      album.numberOfPhotos = newValue;
    } else {
      album.numberOfPhotos--;
      if (album.numberOfPhotos < 0)
        throw new CustomBadRequestException(
          'Liczba dostępnych zdjęć w albumie nie może być mniejsza od 0.',
        );
    }
    await album.save();
  }

  async delete(res: Response, user: User, slug: string) {
    const album = await Album.findOne({
      where: { slug },
      relations: ['photos'],
    });
    if (!album)
      throw new CustomNotFoundException('Album nie został odnaleziony.');

    try {
      await Promise.all(
        album.photos.map(async (photo) => {
          await this.photoService.delete(
            res,
            photo.fileName,
            album.slug,
            false,
          );
        }),
      );
      await album.remove();

      return pageRenderHandler(res, user, 'album/success', {
        message: 'Pomyślnie usunięto album',
      });
    } catch (e) {
      console.error(e);
      throw new CustomInternalServerException(
        'Podczas próby usunięcia albumu wystąpił błąd.',
      );
    }
  }
}
