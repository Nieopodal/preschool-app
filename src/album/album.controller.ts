import { Controller, Get, Param, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @Get('/')
  @Redirect('/album/strona/1')
  redirect() {
    return;
  }

  @Get('/strona/:pageNumber')
  async getAllAlbums(
    @Res() res: Response,
    @Param('pageNumber') pageNumber: string,
  ) {
    return await this.albumService.getAllAlbums(res, Number(pageNumber));
  }

  @Get('/dodaj')
  async getAddAlbumPage(@Res() res: Response) {
    return await this.albumService.getAddAlbumPage(res);
  }

  @Get('/:id/edycja')
  async getEditAlbumPage(@Res() res: Response, @Param('id') id: string) {
    return await this.albumService.getEditAlbumPage(res, id);
  }

  @Get('/:id')
  async getOneAlbum(@Res() res: Response, @Param('id') id: string) {
    return await this.albumService.getOneAlbum(res, id);
  }
}
