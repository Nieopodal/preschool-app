import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Redirect,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { NewsService } from './news.service';
import { NewsDto } from './dto/news.dto';
import { UserObject } from '../decorators/user-object.decorator';
import { User } from '../user/entity/user.entity';
import { AllowAny } from '../decorators/allow-any.decorator';

@Controller('/aktualnosci')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get('/')
  @AllowAny()
  @Redirect('/aktualnosci/strona/1')
  redirect() {
    return;
  }

  @Post('/')
  async addNews(
    @UserObject() user: User,
    @Res() res: Response,
    @Body()
    data: NewsDto,
  ) {
    return await this.newsService.addNews(res, user, data);
  }

  @Put('/:id')
  async editNews(
    @UserObject() user: User,
    @Res() res: Response,
    @Param('id') id: string,
    @Body()
    data: NewsDto,
  ) {
    return await this.newsService.editNews(res, user, id, data);
  }

  @Delete('/:id')
  async removeNews(
    @UserObject() user: User,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    return await this.newsService.removeNews(res, user, id);
  }

  @Get('/strona/:pageNumber')
  @AllowAny()
  async getAllNews(
    @UserObject() user: User,
    @Res() res: Response,
    @Param('pageNumber') pageNumber: string,
  ) {
    return await this.newsService.getNewsPage(res, user, Number(pageNumber));
  }

  @Get('/dodaj')
  async getAddNewsPage(@UserObject() user: User, @Res() res: Response) {
    return await this.newsService.getAddNewsPage(res, user);
  }

  @Get('/:id/edycja')
  async getEditNewsPage(
    @UserObject() user: User,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    return await this.newsService.getEditNewsPage(res, user, id);
  }

  @Get('/:id')
  @AllowAny()
  async getOneNews(
    @UserObject() user: User,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    return await this.newsService.getOneNews(res, user, id);
  }
}
