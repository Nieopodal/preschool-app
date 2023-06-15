import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { format } from 'date-fns';
import { paginationHandler } from '../utils/pagination.handler';
import { Album } from './entity/album.entity';
import { PhotoService } from '../photo/photo.service';
import { pageRenderHandler } from '../utils/page-render.handler';
import { User } from '../user/entity/user.entity';
import { AlbumWithPhotos } from '../types';

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
      const { id, title, createdAt, numberOfPhotos, photos } = album;
      return {
        id,
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

  async getOneAlbum(res: Response, user: User, id: string) {
    const album: AlbumWithPhotos = await Album.findOne({
      relations: ['photos'],
      where: {
        id,
      },
    });

    if (!album) {
      throw new Error('Album nie został odnaleziony.');
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

  async getEditAlbumPage(res: Response, user: User, id: string) {
    const album: AlbumWithPhotos = await Album.findOne({
      relations: ['photos'],
      where: {
        id,
      },
    });

    if (!album) {
      throw new Error('Album nie został odnaleziony.');
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
    editingAlbumId?: string,
  ) {
    const album = editingAlbumId
      ? await Album.findOneOrFail({ where: { id: editingAlbumId } })
      : new Album();
    try {
      album.title = JSON.parse(JSON.stringify(req.body)).title;
      album.numberOfPhotos = editingAlbumId
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
          message: editingAlbumId
            ? 'Zapisano zmiany'
            : 'Pomyślnie dodano nowy album',
        },
        { id: album.id },
      );
    } catch (e) {
      try {
        if (fileNames.length > 0) {
          await Promise.all(
            fileNames.map(async (fileName) => {
              await this.photoService.delete(res, fileName, album.id, false, e);
            }),
          );
        }
        const brokenAlbum = await Album.findOne({
          where: { id: album.id },
        });

        if (brokenAlbum) await brokenAlbum.remove();
      } catch (e2) {
        console.log('błąd podczas usuwania pliku', e2);
      }
      //@TODO: improve errors
      throw e;
    }
  }

  async editOrDecreaseNumberOfPhotos(
    id: string,
    newValue?: number,
  ): Promise<void> {
    const album = await Album.findOne({ where: { id } });
    if (!album) throw new Error('Album nie został odnaleziony.');
    if (newValue) {
      album.numberOfPhotos = newValue;
    } else {
      album.numberOfPhotos--;
      if (album.numberOfPhotos < 0)
        throw new Error('Liczba dostępnych zdjęć nie może być mniejsza od 0.');
    }
    await album.save();
  }

  async delete(res: Response, user: User, id: string) {
    const album = await Album.findOne({
      where: { id },
      relations: ['photos'],
    });

    if (!album) throw new Error('Nie znaleziono albumu.');

    try {
      await Promise.all(
        album.photos.map(async (photo) => {
          await this.photoService.delete(res, photo.fileName, album.id, false);
        }),
      );
      await album.remove();

      return pageRenderHandler(res, user, 'album/success', {
        message: 'Pomyślnie usunięto album',
      });
    } catch (e) {
      console.log(e);
    }
  }
}
