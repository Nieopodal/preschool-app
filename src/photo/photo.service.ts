import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { paginationHandler } from '../utils/pagination.handler';
import { Photo } from './entity/photo.entity';
import { Response } from 'express';

@Injectable()
export class PhotoService {
  async getAllPhotos(res: Response, currentPage: number) {
    const maxPerPage = 10;
    const [photos, count] = await Photo.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });
    const pagesCount = Math.ceil(count / maxPerPage);
    const fixedDatePhotos = photos.map((photo) => {
      return {
        ...photo,
        createdAt: format(photo.createdAt, 'dd.MM.yyyy'),
      };
    });
    return res.render('album/list-all', {
      layout: 'index',
      photos: fixedDatePhotos,
      paginationSettings: paginationHandler(currentPage, pagesCount, 'album'),
    });
  }

  async getOnePhoto(res: Response, id: string) {
    const photo = await Photo.findOne({
      where: {
        id,
      },
    });

    if (!photo) {
      throw new Error('Zdjęcie nie zostało odnalezione.');
    }
    const fixedDatePhoto = {
      ...photo,
      createdAt: format(photo.createdAt, 'dd.MM.yyyy, HH:mm'),
    };
    res.render('album/list-one', { layout: 'index', photo: fixedDatePhoto });
  }

  async getAddPhotoPage(res: Response) {
    return res.render('album/add', { layout: 'index' });
  }

  async getEditPhotoPage(res: Response, id: string) {
    const photo = await Photo.findOne({
      where: {
        id,
      },
    });

    if (!photo) {
      throw new Error('Artykuł nie został odnaleziony.');
    }
    const fixedDatePhoto = {
      ...photo,
      createdAt: format(photo.createdAt, 'dd.MM.yyyy, HH:mm'),
    };
    res.render('album/edit', {
      layout: 'index',
      item: fixedDatePhoto,
      pageName: 'album',
    });
  }
}
