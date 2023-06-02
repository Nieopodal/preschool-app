import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { paginationHandler } from '../utils/pagination.handler';
import { Photo } from './entity/photo.entity';
import { Response } from 'express';

@Injectable()
export class PhotoService {
  async getAllPhotos(res: Response, currentPage: number) {
    const maxPerPage = 3;
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
}
