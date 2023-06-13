import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AlbumService } from './album.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from '../pipes/sharp.pipe';
import { photoFileFilter } from '../utils/photo-file-filter.handler';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @Get('/')
  @Redirect('/album/strona/1')
  redirect() {
    return;
  }

  @Post('/')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      fileFilter: photoFileFilter,
    }),
  )
  async addAlbum(
    @UploadedFiles(SharpPipe)
    files: string[],
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return await this.albumService.addOrEdit(req, res, files);
  }

  @Patch('/:albumId')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      fileFilter: photoFileFilter,
    }),
  )
  async editAlbum(
    @UploadedFiles(SharpPipe)
    files: string[],
    @Req() req: Request,
    @Res() res: Response,
    @Param('albumId') albumId: string,
  ) {
    return await this.albumService.addOrEdit(req, res, files, albumId);
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
