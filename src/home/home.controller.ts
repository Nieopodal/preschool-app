import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('home')
export class HomeController {
  @Get('/')
  async getHomePage(@Res() res: Response) {
    return res.render('home/home', { layout: 'index' });
  }
}
