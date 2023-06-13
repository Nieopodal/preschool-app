import { Controller, Delete, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Delete('/:fileName/:albumId')
  async delete(
    @Res() res: Response,
    @Param('fileName') fileName: string,
    @Param('albumId') albumId: string,
  ) {
    return await this.photoService.delete(res, fileName, albumId);
  }
}
