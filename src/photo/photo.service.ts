import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { AlbumService } from '../album/album.service';
import { storageDir } from '../utils/storage';
import { Photo } from './entity/photo.entity';
import { Album } from '../album/entity/album.entity';
import { CustomInternalServerException } from '../exceptions/custom-internal-server.exception';
import { CustomNotFoundException } from '../exceptions/custom-not-found.exception';

@Injectable()
export class PhotoService {
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
  ) {}

  async delete(
    res: Response,
    fileName: string,
    albumId: string,
    redirect?: boolean,
    e?: any,
  ): Promise<void> {
    try {
      const photo = await Photo.findOne({
        relations: ['album'],
        where: {
          fileName,
        },
      });
      if (!photo)
        throw new CustomNotFoundException('Brak zdjęcia w bazie danych.');
      if (photo.album.id !== albumId)
        throw new CustomNotFoundException(
          'Zdjęcie nie znajduje się w bieżącym albumie.',
        );

      await fs.promises.unlink(path.join(storageDir(), 'upload', fileName));
      if (photo) await photo.remove();

      await this.albumService.editOrDecreaseNumberOfPhotos(albumId);

      if (e) return e;
      if (redirect) res.redirect(`/album/${albumId}/edycja/`);
    } catch (e) {
      console.error(e);
      throw new CustomInternalServerException(
        'Podczas usuwania zdjęcia wystąpił błąd.',
      );
    }
  }

  async add(fileName: string, album: Album): Promise<void> {
    const photo = new Photo();
    photo.album = album;
    photo.fileName = fileName;
    await photo.save();
  }
}
