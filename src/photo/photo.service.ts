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
        createdAt: format(photo.createdAt, 'dd.MM.yyyy, HH:mm'),
      };
    });
    return res.render('photo/list-all', {
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
    res.render('photo/list-one', { layout: 'index', photo: fixedDatePhoto });
  }

  async getAddPhotoPage(res: Response) {
    return res.render('photo/add', { layout: 'index' });
  }
}
