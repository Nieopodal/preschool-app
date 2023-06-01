import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { format } from 'date-fns';
import { News } from './entity/news.entity';
import { paginationHandler } from '../utils/pagination.handler';

@Injectable()
export class NewsService {
  async getNewsPage(res: Response, currentPage: number) {
    const maxPerPage = 3;
    const [news, count] = await News.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });

    const pagesCount = Math.ceil(count / maxPerPage);

    const fixedDateNews = news.map((news) => {
      return {
        ...news,
        article: news.isTooLong ? news.article.substring(0, 600) : news.article,
        createdAt: format(news.createdAt, 'dd.MM.yyyy, HH:mm'),
      };
    });
    return res.render('news/list-all', {
      layout: 'index',
      news: fixedDateNews,
      paginationSettings: paginationHandler(
        currentPage,
        pagesCount,
        'aktualnosci',
      ),
    });
  }
}
