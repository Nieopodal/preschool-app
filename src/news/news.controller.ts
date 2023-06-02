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

@Controller('/aktualnosci')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get('/')
  @Redirect('/aktualnosci/strona/1')
  SecondRedirect() {
    return;
  }

  @Post('/')
  async addNews(
    @Res() res: Response,
    @Body()
    data: NewsDto,
  ) {
    return await this.newsService.addNews(res, data);
  }

  @Put('/:id')
  async editNews(
    @Res() res: Response,
    @Param('id') id: string,
    @Body()
    data: NewsDto,
  ) {
    return await this.newsService.editNews(res, id, data);
  }

  @Delete('/:id')
  async removeNews(@Res() res: Response, @Param('id') id: string) {
    return await this.newsService.removeNews(res, id);
  }

  @Get('/strona/:pageNumber')
  async getAllNews(
    @Res() res: Response,
    @Param('pageNumber') pageNumber: string,
  ) {
    return await this.newsService.getNewsPage(res, Number(pageNumber));
  }

  @Get('/dodaj')
  async getAddNewsPage(@Res() res: Response) {
    return await this.newsService.getAddNewsPage(res);
  }

  @Get('/:id/edycja')
  async getEditNewsPage(@Res() res: Response, @Param('id') id: string) {
    return await this.newsService.getEditNewsPage(res, id);
  }

  @Get('/:id')
  async getOneNews(@Res() res: Response, @Param('id') id: string) {
    return await this.newsService.getOneNews(res, id);
  }
}
