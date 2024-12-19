import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { RefreshToken } from "./refresh-token.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { SocketAuthGuard } from "./socket-auth.guard";
import { AuthGuard } from "./auth.guard";
import { User } from "../users/user.model";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    SequelizeModule.forFeature([User,RefreshToken]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    AuthGuard,
    SocketAuthGuard,
  ],
  exports: [
    AuthGuard,
    SocketAuthGuard,
    JwtModule,
  ],
})
export class AuthModule {}
