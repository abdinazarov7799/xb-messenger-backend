import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from "@nestjs/sequelize";
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { SocketsModule } from './sockets/sockets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ChatsModule,
    MessagesModule,
    SocketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
