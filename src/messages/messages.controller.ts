import { Controller, Post, Get, Param, Body, ParseIntPipe } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post('send')
  async sendMessage(@Body() body: { chatId: number; senderId: number; mediaType: 'text' | 'file'; content: any }) {
    return this.messagesService.sendMessage(body.chatId, body.senderId, body.mediaType, body.content);
  }

  @Get(':chatId')
  async getMessages(@Param('chatId', ParseIntPipe) chatId: number) {
    return this.messagesService.getMessages(chatId);
  }
}
