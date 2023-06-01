import { Controller, Get, Param, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { NewsService } from './news.service';

@Controller('/aktualnosci')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/strona')
  @Redirect('/aktualnosci/strona/1')
  Redirect() {
    return;
  }
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
}
