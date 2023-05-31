import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('/')
export class HomeController {
  @Get('/')
  async getHomePage(@Res() res: Response) {
    return res.render('home/home', { layout: 'index' });
  }

  @Get('/o-przedszkolu')
  async getAboutPage(@Res() res: Response) {
    return res.render('home/about', { layout: 'index' });
  }

  @Get('/kontakt')
  async getContactPage(@Res() res: Response) {
    return res.render('home/contact', { layout: 'index' });
  }

  @Get('/statut')
  async getStatutePage(@Res() res: Response) {
    return res.render('home/statute', { layout: 'index' });
  }

  @Get('/regulamin-i-procedury')
  async getRegulationsPage(@Res() res: Response) {
    return res.render('home/regulations', { layout: 'index' });
  }

  @Get('/oplaty')
  async getFeesPage(@Res() res: Response) {
    return res.render('home/fees', { layout: 'index' });
  }

  @Get('/ochrona-danych-osobowych')
  async getGdprPage(@Res() res: Response) {
    return res.render('home/gdpr', { layout: 'index' });
  }

  @Get('/polityka-prywatnosci')
  async getPrivacyPolicyPage(@Res() res: Response) {
    return res.render('home/privacy-policy', { layout: 'index' });
  }

  @Get('/pracownicy-przedszkola')
  async getEmployeesPage(@Res() res: Response) {
    return res.render('home/employees', { layout: 'index' });
  }

  @Get('/grupy-w-przedszkolu')
  async getGroupsPage(@Res() res: Response) {
    return res.render('home/groups', { layout: 'index' });
  }

  @Get('/realizowane-programy-certyfikaty')
  async getImplementedProgramsPage(@Res() res: Response) {
    return res.render('home/implemented-programs', { layout: 'index' });
  }

  @Get('/organizacja-pracy')
  async getOrganizationPage(@Res() res: Response) {
    return res.render('home/organization', { layout: 'index' });
  }
}
