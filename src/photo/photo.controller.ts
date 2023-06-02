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

  @Get('/dodaj')
  async getAddPhotoPage(@Res() res: Response) {
    return await this.photoService.getAddPhotoPage(res);
  }

  @Get('/:id/edycja')
  async getEditPhotoPage(@Res() res: Response, @Param('id') id: string) {
    return await this.photoService.getEditPhotoPage(res, id);
  }

  @Get('/:id')
  async getOnePhoto(@Res() res: Response, @Param('id') id: string) {
    return await this.photoService.getOnePhoto(res, id);
  }
}
