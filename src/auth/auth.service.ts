import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RefreshToken } from "./refresh-token.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(RefreshToken) private refreshTokenModel: typeof RefreshToken,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });

    await this.refreshTokenModel.create({
      userId: user.id,
      token: refreshToken,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 kun
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async refresh(refreshToken: string) {
    const storedToken = await this.refreshTokenModel.findOne({ where: { token: refreshToken } });

    if (!storedToken || new Date() > storedToken.expires) {
      throw new Error('Invalid or expired refresh token');
    }

    const payload = this.jwtService.verify(refreshToken);
    const newAccessToken = this.jwtService.sign({ username: payload.username, sub: payload.sub }, { expiresIn: '15m' });

    return { access_token: newAccessToken };
  }
}
