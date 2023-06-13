import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import { storageDir } from '../utils/storage';

@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File[], Promise<string[]>>
{
  async transform(images: Express.Multer.File[]) {
    const filenames: string[] = [];
    await Promise.all(
      images.map(async (photo) => {
        const filename = uuid() + '.webp';
        await sharp(photo.buffer)
          .rotate()
          .resize({
            height: 900,
            fit: 'contain',
          })
          .webp({ effort: 3 })
          .toFile(path.join(storageDir(), 'upload', filename));
        filenames.push(filename);
      }),
    );

    return filenames;
  }
}
