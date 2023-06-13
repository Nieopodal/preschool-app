import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AlbumService } from '../album/album.service';
import * as fs from 'fs';
import * as path from 'path';
import { storageDir } from '../utils/storage';
import { Photo } from './entity/photo.entity';

@Injectable()
export class PhotoService {
  constructor(private readonly albumService: AlbumService) {}
  async delete(res: Response, fileName: string, albumId: string) {
    try {
      const photo = await Photo.findOne({
        where: {
          fileName,
        },
      });

      if (!photo) throw new Error('Brak zdjęcia w bazie danych.');

      await fs.promises.unlink(path.join(storageDir(), 'upload', fileName));
      const brokenPhoto = await Photo.findOne({
        where: { fileName },
      });
      if (brokenPhoto) await brokenPhoto.remove();

      await this.albumService.editOrDecreaseNumberOfPhotos(albumId);

      res.redirect(`/album/${albumId}/edycja/`);
    } catch (e) {
      console.log(e);
    }
  }
}
