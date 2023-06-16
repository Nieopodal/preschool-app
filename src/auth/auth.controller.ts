import { Body, Controller, Delete, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';

import { UserObject } from '../decorators/user-object.decorator';
import { User } from '../user/entity/user.entity';
import { AllowAny } from '../decorators/allow-any.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @AllowAny()
  async login(
    @UserObject() user: User,
    @Body() req: AuthLoginDto,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.login(req, res, user);
  }

  @Get('/login')
  @AllowAny()
  async getLoginPage(
    @UserObject() user: User,
    @Res() res: Response,
  ): Promise<any> {
    return await this.authService.getLoginPage(res, user);
  }

  @Get('/logout')
  async getConfirmLogoutPage(
    @UserObject() user: User,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.getConfirmLogoutPage(res, user);
  }

  @Delete('/logout')
  async logout(@UserObject() user: User, @Res() res: Response): Promise<any> {
    return this.authService.logout(res, user);
  }
}
