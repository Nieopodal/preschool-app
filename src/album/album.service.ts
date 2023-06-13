import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { format } from 'date-fns';
import { paginationHandler } from '../utils/pagination.handler';
import { Album } from './entity/album.entity';
import { Photo } from '../photo/entity/photo.entity';
import { PhotoService } from '../photo/photo.service';

interface AlbumWithPhotos extends Album {
  photos: Photo[];
}

// @TODO: przenieść do typów

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => PhotoService))
    private readonly photoService: PhotoService,
  ) {}
  async getAllAlbums(res: Response, currentPage: number) {
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
    return res.render('album/list-all', {
      layout: 'index',
      albums: fixedDateAlbums,
      paginationSettings: paginationHandler(currentPage, pagesCount, 'album'),
    });
  }

  async getOneAlbum(res: Response, id: string) {
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
    res.render('album/list-one', { layout: 'index', album: fixedDateAlbum });
  }

  async getAddAlbumPage(res: Response) {
    return res.render('album/add', { layout: 'index' });
  }

  async getEditAlbumPage(res: Response, id: string) {
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

    return res.render('album/edit', { layout: 'index', item: fixedDateAlbum });
  }

  async addAlbum(req: Request, res: Response, fileNames: string[]) {
    const album = new Album();
    try {
      album.title = JSON.parse(JSON.stringify(req.body)).title;
      album.numberOfPhotos = fileNames.length;
      await album.save();
      await Promise.all(
        fileNames.map(async (fileName) => {
          await this.photoService.add(fileName, album);
        }),
      );

      return res.render('album/success', {
        layout: 'index',
        message: 'Pomyślnie dodano nowy album',
        id: album.id,
      });
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

  async numberOfPhotos(id: string): Promise<number> {
    const album = await Album.findOne({ where: { id } });
    if (!album) throw new Error('Album nie został odnaleziony.');
    return album.numberOfPhotos;
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
}
