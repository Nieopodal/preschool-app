import { Controller, Delete, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Delete('/:fileName/:albumSlug')
  async delete(
    @Res() res: Response,
    @Param('fileName') fileName: string,
    @Param('albumSlug') albumSlug: string,
  ) {
    return await this.photoService.delete(res, fileName, albumSlug, true);
  }
}
