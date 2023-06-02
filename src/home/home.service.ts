import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { NewsService } from '../news/news.service';

@Injectable()
export class HomeService {
  constructor(private newsService: NewsService) {}
  async getHomePage(res: Response) {
    const shorterFirstNews = await this.newsService.getRecentShortenNews();
    return res.render('home/home', { layout: 'index', shorterFirstNews });
  }
}
