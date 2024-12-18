import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Post('create')
  async createChat(@Body() body: { userId: number; type: 'private' | 'group'; name?: string }) {
    return this.chatsService.createChat(body.userId, body.type, body.name);
  }

  @Post(':id/add-participant')
  async addParticipant(
    @Param('id', ParseIntPipe) chatId: number,
    @Body() body: { userId: number; addedBy: number },
  ) {
    return this.chatsService.addParticipant(chatId, body.userId, body.addedBy);
  }
}
