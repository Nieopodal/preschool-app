import { Controller, Get, Param, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { PhotoService } from './photo.service';

@Controller('album')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get('/')
  @Redirect('/album/strona/1')
  redirect() {
    return;
  }

  @Get('/strona/:pageNumber')
  async getAllPhotos(
    @Res() res: Response,
    @Param('pageNumber') pageNumber: string,
  ) {
    return await this.photoService.getAllPhotos(res, Number(pageNumber));
  }
}
