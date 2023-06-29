import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Response } from 'express';
import { User } from '../user/entity/user.entity';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt-strategy';
import { ConfigService } from '@nestjs/config';
import { pageRenderHandler } from '../utils/page-render.handler';
import { comparePwd } from '../utils/compare-pwd';
import { sleep } from '../utils/sleep';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  private createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(payload, this.configService.get('SECRET_KEY'), {
      expiresIn,
    });
    return { accessToken, expiresIn };
  }

  private async generateToken(user: User): Promise<string> {
    let token;
    let userWithThisToken = null;

    do {
      token = uuid();
      userWithThisToken = await User.findOne({
        where: {
          currentTokenId: token,
        },
      });
    } while (!!userWithThisToken);
    user.currentTokenId = token;
    await user.save();

    return token;
  }

  async login(req: AuthLoginDto, res: Response, user: User): Promise<any> {
    await sleep(2000);
    if (user) return res.redirect('/dashboard');

    try {
      const foundUser = await User.findOne({
        where: {
          email: req.email,
        },
      });

      if (!foundUser) {
        return pageRenderHandler(res, user, 'user/login', {
          error: 'Nieprawidłowy login i/lub hasło.',
        });
      }

      const passwordMatch = await comparePwd(req.pwd, foundUser.pwdHash);

      if (!passwordMatch) {
        return pageRenderHandler(res, user, 'user/login', {
          error: 'Nieprawidłowy login i/lub hasło.',
        });
      }

      const token = await this.createToken(await this.generateToken(foundUser));

      return res
        .cookie('jwt', token.accessToken, {
          secure: false,
          // @TODO: in production TRUE
          // domain: 'localhost',
          // @TODO: in production domain
          httpOnly: true,
        })
        .redirect('/dashboard');
    } catch (e) {
      return res.json({ error: e.message });
    }
  }

  async getConfirmLogoutPage(res: Response, user: User) {
    return pageRenderHandler(res, user, 'user/confirm-logout');
  }
  async logout(res: Response, user: User) {
    try {
      user.currentTokenId = null;
      await user.save();

      return res
        .clearCookie('jwt', {
          secure: false,
          // domain: 'localhost',
          httpOnly: true,
          //@TODO: in production: change secure && domain
        })
        .redirect('/auth/login');
    } catch (e) {
      return res.json({ error: e.message });
    }
  }

  async getLoginPage(res: Response, user: User) {
    if (user instanceof User) return res.redirect('/dashboard');

    return pageRenderHandler(res, user, 'user/login');
  }
}
