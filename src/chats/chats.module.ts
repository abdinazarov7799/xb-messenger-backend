import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { ChatParticipant } from './chat-participant.model';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
  imports: [SequelizeModule.forFeature([Chat, ChatParticipant])],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
