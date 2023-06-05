import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { format } from 'date-fns';
import { paginationHandler } from '../utils/pagination.handler';
import { Album } from './entity/album.entity';
import { Photo } from '../photo/entity/photo.entity';

interface AlbumWithPhotos extends Album {
  photos: Photo[];
}
// @TODO: przenieść do typów

@Injectable()
export class AlbumService {
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
      throw new Error('Zdjęcie nie zostało odnalezione.');
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
      throw new Error('Zdjęcie nie zostało odnalezione.');
    }
    const fixedDateAlbum = {
      ...album,
      createdAt: format(album.createdAt, 'dd.MM.yyyy'),
    };


    return res.render('album/edit', { layout: 'index', item: fixedDateAlbum });
  }
}
