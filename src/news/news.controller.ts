import { Controller, Get, Param, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { NewsService } from './news.service';

@Controller('/aktualnosci')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get('/')
  @Redirect('/aktualnosci/strona/1')
  SecondRedirect() {
    return;
  }
  @Get('/strona/:pageNumber')
  async getAllNews(
    @Res() res: Response,
    @Param('pageNumber') pageNumber: string,
  ) {
    return await this.newsService.getNewsPage(res, Number(pageNumber));
  }

  @Get('/:id')
  async getOneNews(@Res() res: Response, @Param('id') id: string) {
    return await this.newsService.getOneNews(res, id);
  }
}
