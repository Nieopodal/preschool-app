import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { HomeService } from './home.service';
import { UserObject } from '../decorators/user-object.decorator';
import { User } from '../user/entity/user.entity';
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
    return await this.homeService.getAboutPage(res, user);
  }

  @Get('/kontakt')
  @AllowAny()
  async getContactPage(@UserObject() user: User, @Res() res: Response) {
    return await this.homeService.getContactPage(res, user);
  }

  @Get('/statut')
  @AllowAny()
  async getStatutePage(@UserObject() user: User, @Res() res: Response) {
    return await this.homeService.getStatutePage(res, user);
  }

  @Get('/regulamin-i-procedury')
  @AllowAny()
  async getRegulationsPage(@UserObject() user: User, @Res() res: Response) {
    return this.homeService.getRegulationsPage(res, user);
  }

  @Get('/oplaty')
  @AllowAny()
  async getFeesPage(@UserObject() user: User, @Res() res: Response) {
    return await this.homeService.getFeesPage(res, user);
  }

  @Get('/ochrona-danych-osobowych')
  @AllowAny()
  async getGdprPage(@UserObject() user: User, @Res() res: Response) {
    return await this.homeService.getGdprPage(res, user);
  }

  @Get('/polityka-prywatnosci')
  @AllowAny()
  async getPrivacyPolicyPage(@UserObject() user: User, @Res() res: Response) {
    return await this.homeService.getPrivacyPolicyPage(res, user);
  }

  @Get('/pracownicy-przedszkola')
  @AllowAny()
  async getEmployeesPage(@UserObject() user: User, @Res() res: Response) {
    return await this.homeService.getEmployeesPage(res, user);
  }

  @Get('/grupy-w-przedszkolu')
  @AllowAny()
  async getGroupsPage(@UserObject() user: User, @Res() res: Response) {
    return await this.homeService.getGroupsPage(res, user);
  }

  @Get('/realizowane-programy-certyfikaty')
  @AllowAny()
  async getImplementedProgramsPage(
    @UserObject() user: User,
    @Res() res: Response,
  ) {
    return await this.homeService.getImplementedProgramsPage(res, user);
  }

  @Get('/organizacja-pracy')
  @AllowAny()
  async getOrganizationPage(@UserObject() user: User, @Res() res: Response) {
    return await this.homeService.getOrganizationPage(res, user);
  }

  @Get('/mapa-strony')
  @AllowAny()
  async getSitemapPage(@UserObject() user: User, @Res() res: Response) {
    return await this.homeService.getSitemapPage(res, user);
  }

  @Get('/informacje-o-dostepnosci')
  @AllowAny()
  async getAccessibilityInfoPage(
    @UserObject() user: User,
    @Res() res: Response,
  ) {
    return await this.homeService.getAccessibilityInfoPage(res, user);
  }

  @Get('/dashboard')
  async getDashboardPage(
    @UserObject() user: User,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return await this.homeService.getDashboardPage(res, user);
  }
}
