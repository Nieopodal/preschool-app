import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { NewsService } from '../news/news.service';
import { pageRenderHandler } from '../utils/page-render.handler';
import { User } from '../user/entity/user.entity';

@Injectable()
export class HomeService {
  constructor(private newsService: NewsService) {}
  async getHomePage(res: Response, user: User) {
    const shorterFirstNews = await this.newsService.getRecentShortenNews();
    return pageRenderHandler(res, user, 'home/home', { shorterFirstNews });
  }
}
