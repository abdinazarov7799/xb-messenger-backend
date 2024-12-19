import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('send')
  @ApiBody({ type: CreateMessageDto })
  async sendMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.createMessage(createMessageDto);
  }

  @Get('chat/:chatId')
  @ApiParam({ name: 'chatId', description: 'ID of the chat' })
  async getMessagesByChat(@Param('chatId', ParseIntPipe) chatId: string) {
    return this.messagesService.getMessagesByChat(chatId);
  }
}
