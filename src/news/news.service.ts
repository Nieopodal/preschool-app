import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { format } from 'date-fns';
import { News } from './entity/news.entity';
import { paginationHandler } from '../utils/pagination.handler';
import { NewsResponse } from '../types';
import { User } from '../user/entity/user.entity';
import { pageRenderHandler } from '../utils/page-render.handler';
import { CustomInternalServerException } from '../exceptions/custom-internal-server.exception';

@Injectable()
export class NewsService {
  async getNewsPage(res: Response, user: User, currentPage: number) {
    const maxPerPage = 10;
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

    return pageRenderHandler(
      res,
      user,
      'news/list-all',
      { news: fixedDateNews },
      {
        paginationSettings: paginationHandler(
          currentPage,
          pagesCount,
          'aktualnosci',
        ),
      },
    );
  }

  async getRecentShortenNews(): Promise<NewsResponse[] | null> {
    const news = await News.find({
      skip: 0,
      take: 2,
      order: { createdAt: 'DESC' },
    });
    if (news.length === 0) return null;

    return news.map((news) => ({
      ...news,
      article: news.isTooLong ? news.article.substring(0, 600) : news.article,
      createdAt: format(news.createdAt, 'dd.MM.yyyy, HH:mm'),
    }));
  }

  async getOneNews(res: Response, user: User, id: string) {
    const news = await News.findOne({
      where: {
        id,
      },
    });

    if (!news) {
      throw new NotFoundException('Artykuł nie został odnaleziony.');
    }
    const fixedDateNews = {
      ...news,
      createdAt: format(news.createdAt, 'dd.MM.yyyy, HH:mm'),
    };

    return pageRenderHandler(res, user, 'news/list-one', {
      news: fixedDateNews,
    });
  }

  async getEditNewsPage(res: Response, user: User, id: string) {
    const news = await News.findOne({
      where: {
        id,
      },
    });

    if (!news) {
      throw new NotFoundException('Artykuł nie został odnaleziony.');
    }
    const fixedDateNews = {
      ...news,
      createdAt: format(news.createdAt, 'dd.MM.yyyy, HH:mm'),
    };

    return pageRenderHandler(
      res,
      user,
      'news/edit',
      {
        item: fixedDateNews,
      },
      { pageName: 'aktualnosci' },
    );
  }

  async getAddNewsPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'news/add');
  }

  async addNews(
    res: Response,
    user: User,
    data: { title: string; article: string },
  ) {
    const { title, article } = data;
    const newArticle = new News();
    newArticle.title = title;
    newArticle.article = article;
    newArticle.isTooLong = article.length > 600;
    await newArticle.save();

    return pageRenderHandler(
      res,
      user,
      'news/success',
      { message: 'Pomyślnie dodano nowy artykuł.' },
      { id: newArticle.id },
    );
  }

  async editNews(
    res: Response,
    user: User,
    id: string,
    data: { title: string; article: string },
  ) {
    const { title, article } = data;
    const news = await News.update(id, {
      title,
      article,
      isTooLong: article.length > 600,
    });
    if (news.affected !== 1) {
      throw new CustomInternalServerException(
        'Podczas aktualizacji wpisu wystąpił błąd.',
      );
    }

    return pageRenderHandler(
      res,
      user,
      'news/success',
      { message: 'Pomyślnie zaktualizowano wpis.' },
      { id },
    );
  }

  async removeNews(res: Response, user: User, id: string) {
    const deleteResult = await News.delete(id);
    if (deleteResult.affected !== 1) {
      throw new CustomInternalServerException(
        'Podczas usuwania wpisu wystąpił błąd.',
      );
    }

    return pageRenderHandler(res, user, 'news/success', {
      message: 'Pomyślnie usunięto wpis',
    });
  }
}
