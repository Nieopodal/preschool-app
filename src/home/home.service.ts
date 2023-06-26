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

  async getAboutPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/about');
  }

  async getContactPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/contact');
  }

  async getStatutePage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/statute');
  }

  getRegulationsPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/regulations');
  }

  async getFeesPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/fees');
  }

  async getGdprPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/gdpr');
  }

  async getPrivacyPolicyPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/privacy-policy');
  }

  async getEmployeesPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/employees');
  }

  async getGroupsPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/groups');
  }

  async getImplementedProgramsPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/implemented-programs');
  }

  async getOrganizationPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'home/organization');
  }

  async getDashboardPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'user/dashboard');
  }
}
