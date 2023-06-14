import {
  Controller,
  Delete,
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
import { UserObject } from '../decorators/user-object.decorator';
import { User } from '../user/entity/user.entity';

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
    @UserObject() user: User,
    @UploadedFiles(SharpPipe)
    files: string[],
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return await this.albumService.addOrEdit(req, res, user, files);
  }

  @Patch('/:id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      fileFilter: photoFileFilter,
    }),
  )
  async editAlbum(
    @UserObject() user: User,
    @UploadedFiles(SharpPipe)
    files: string[],
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    return await this.albumService.addOrEdit(req, res, user, files, id);
  }

  @Delete('/:id')
  async deleteAlbum(
    @UserObject() user: User,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    return await this.albumService.delete(res, user, id);
  }

  @Get('/strona/:pageNumber')
  async getAllAlbums(
    @UserObject() user: User,
    @Res() res: Response,
    @Param('pageNumber') pageNumber: string,
  ) {
    return await this.albumService.getAllAlbums(res, user, Number(pageNumber));
  }

  @Get('/dodaj')
  async getAddAlbumPage(@UserObject() user: User, @Res() res: Response) {
    return await this.albumService.getAddAlbumPage(res, user);
  }

  @Get('/:id/edycja')
  async getEditAlbumPage(
    @UserObject() user: User,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    return await this.albumService.getEditAlbumPage(res, user, id);
  }

  @Get('/:id')
  async getOneAlbum(
    @UserObject() user: User,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    return await this.albumService.getOneAlbum(res, user, id);
  }
}
