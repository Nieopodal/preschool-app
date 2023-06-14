import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Response } from 'express';
import { User } from '../user/entity/user.entity';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt-strategy';
import { ConfigService } from '@nestjs/config';
import { hashPwd } from '../utils/hash-pwd';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  private createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = this.configService.get('EXPIRES_IN');
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
    if (user) return res.redirect('/dashboard');
    try {
      const foundUser = await User.findOne({
        where: {
          email: req.email,
          pwdHash: await hashPwd(req.pwd),
        },
      });

      if (!foundUser) {
        return res.json({ error: 'Invalid login data!' });
      }

      const token = await this.createToken(await this.generateToken(foundUser));

      return res
        .cookie('jwt', token.accessToken, {
          secure: false,
          // @TODO: in production TRUE
          domain: 'localhost',
          // @TODO: in production domain
          httpOnly: true,
        })
        .json({ ok: true }); //@TODO pageRenderHandler
    } catch (e) {
      return res.json({ error: e.message });
    }
  }

  async logout(res: Response, user: User) {
    try {
      user.currentTokenId = null;
      await user.save();

      res.clearCookie('jwt', {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
        //@TODO: in production: change secure && domain
      });
      return res.json({ ok: true }); //@TODO Page render handler
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}
