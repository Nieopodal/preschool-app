import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { HomeService } from './home.service';
import { UserObject } from '../decorators/user-object.decorator';
import { User } from '../user/entity/user.entity';
import { pageRenderHandler } from '../utils/page-render.handler';

@Controller('/')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}
  @Get('/')
  async getHomePage(@UserObject() user: User, @Res() res: Response) {
    return await this.homeService.getHomePage(res, user);
  }

  @Get('/o-przedszkolu')
  async getAboutPage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/about');
  }

  @Get('/kontakt')
  async getContactPage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/contact');
  }

  @Get('/statut')
  async getStatutePage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/statute');
  }

  @Get('/regulamin-i-procedury')
  async getRegulationsPage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/regulations');
  }

  @Get('/oplaty')
  async getFeesPage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/fees');
  }

  @Get('/ochrona-danych-osobowych')
  async getGdprPage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/gdpr');
  }

  @Get('/polityka-prywatnosci')
  async getPrivacyPolicyPage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/privacy-policy');
  }

  @Get('/pracownicy-przedszkola')
  async getEmployeesPage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/employees');
  }

  @Get('/grupy-w-przedszkolu')
  async getGroupsPage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/groups');
  }

  @Get('/realizowane-programy-certyfikaty')
  async getImplementedProgramsPage(
    @UserObject() user: User,
    @Res() res: Response,
  ) {
    return pageRenderHandler(res, user, 'home/implemented-programs');
  }

  @Get('/organizacja-pracy')
  async getOrganizationPage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/organization');
  }
}
