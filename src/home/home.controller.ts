import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { HomeService } from './home.service';
import { UserObject } from '../decorators/user-object.decorator';
import { User } from '../user/entity/user.entity';
import { pageRenderHandler } from '../utils/page-render.handler';
import { AllowAny } from '../decorators/allow-any.decorator';

@Controller('/')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}
  @Get('/')
  @AllowAny()
  async getHomePage(@UserObject() user: User, @Res() res: Response) {
    return await this.homeService.getHomePage(res, user);
  }

  @Get('/o-przedszkolu')
  @AllowAny()
  async getAboutPage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/about');
  }

  @Get('/kontakt')
  @AllowAny()
  async getContactPage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/contact');
  }

  @Get('/statut')
  @AllowAny()
  async getStatutePage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/statute');
  }

  @Get('/regulamin-i-procedury')
  @AllowAny()
  async getRegulationsPage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/regulations');
  }

  @Get('/oplaty')
  @AllowAny()
  async getFeesPage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/fees');
  }

  @Get('/ochrona-danych-osobowych')
  @AllowAny()
  async getGdprPage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/gdpr');
  }

  @Get('/polityka-prywatnosci')
  @AllowAny()
  async getPrivacyPolicyPage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/privacy-policy');
  }

  @Get('/pracownicy-przedszkola')
  @AllowAny()
  async getEmployeesPage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/employees');
  }

  @Get('/grupy-w-przedszkolu')
  @AllowAny()
  async getGroupsPage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/groups');
  }

  @Get('/realizowane-programy-certyfikaty')
  @AllowAny()
  async getImplementedProgramsPage(
    @UserObject() user: User,
    @Res() res: Response,
  ) {
    return pageRenderHandler(res, user, 'home/implemented-programs');
  }

  @Get('/organizacja-pracy')
  @AllowAny()
  async getOrganizationPage(@UserObject() user: User, @Res() res: Response) {
    return pageRenderHandler(res, user, 'home/organization');
  }

  @Get('/dashboard')
  async getDashboardPage(
    @UserObject() user: User,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return pageRenderHandler(res, user, 'user/dashboard');
  }
}
