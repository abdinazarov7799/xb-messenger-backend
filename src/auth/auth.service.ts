import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RefreshToken } from './refresh-token.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(RefreshToken) private refreshTokenModel: typeof RefreshToken,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { id, username } = user;
      return { id, username };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });

    const existingToken = await this.refreshTokenModel.findOne({
      where: { userId: user.id },
    });

    if (existingToken) {
      await existingToken.destroy();
    }

    await this.refreshTokenModel.create({
      userId: user.id,
      token: refreshToken,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 kun
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async getMe(user: any) {
    return this.usersService.findById(user.sub);
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const { username, password, firstName, lastName, phoneNumber } =
      registerDto;

    const existingUser = await this.userModel.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.userModel.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
    });
  }

  async refresh(refreshToken: string) {
    const storedToken = await this.refreshTokenModel.findOne({
      where: { token: refreshToken },
    });

    if (!storedToken || new Date() > storedToken.expires) {
      throw new Error('Invalid or expired refresh token');
    }

    const payload = this.jwtService.verify(refreshToken);
    const newAccessToken = this.jwtService.sign(
      { username: payload.username, sub: payload.sub },
      { expiresIn: '15m' },
    );

    return { access_token: newAccessToken };
  }
}
