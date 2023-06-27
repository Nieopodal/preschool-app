import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { NewsService } from '../news/news.service';
import { pageRenderHandler } from '../utils/page-render.handler';
import { User } from '../user/entity/user.entity';
import { getPagesDataHandler } from '../utils/get-pages-data.handler';

@Injectable()
export class HomeService {
  constructor(private newsService: NewsService) {}
  async getHomePage(res: Response, user: User) {
    const shorterFirstNews = await this.newsService.getRecentShortenNews();
    return pageRenderHandler(
      res,
      user,
      'home/home',
      { content: await getPagesDataHandler('homePageContent') },
      { shorterFirstNews },
    );
  }

  async getAboutPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/about', {
      content: await getPagesDataHandler('aboutPageContent'),
    });
  }

  async getContactPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/contact', {
      content: await getPagesDataHandler('contactPageContent'),
    });
  }

  async getStatutePage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/statute', {
      content: await getPagesDataHandler('statutePageContent'),
    });
  }

  async getRegulationsPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/regulations', {
      content: await getPagesDataHandler('regulationsPageContent'),
    });
  }

  async getFeesPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/fees', {
      content: await getPagesDataHandler('feesPageContent'),
    });
  }

  async getGdprPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/gdpr', {
      content: await getPagesDataHandler('gdprPageContent'),
    });
  }

  async getPrivacyPolicyPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/privacy-policy');
  }

  async getEmployeesPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/employees', {
      content: await getPagesDataHandler('employeesPageContent'),
    });
  }

  async getGroupsPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/groups', {
      content: await getPagesDataHandler('groupsPageContent'),
    });
  }

  async getImplementedProgramsPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/implemented-programs', {
      content: await getPagesDataHandler('implementedProgramsPageContent'),
    });
  }

  async getOrganizationPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/organization', {
      content: await getPagesDataHandler('organizationPageContent'),
    });
  }

  async getDashboardPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'user/dashboard');
  }

  async getSitemapPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/sitemap', {
      content: await getPagesDataHandler('sitemapPageContent'),
    });
  }

  async getAccessibilityInfoPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/accessibility-info', {
      content: await getPagesDataHandler('accessibilityInfoPageContent'),
    });
  }
}
