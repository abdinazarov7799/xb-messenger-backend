import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessagesController } from './messages.controller';
import { Message } from './message.model';
import { MessagesService } from './messages.service';

@Module({
  imports: [SequelizeModule.forFeature([Message])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
