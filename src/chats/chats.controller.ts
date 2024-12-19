import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { AddParticipantDto } from './dto/add-participant.dto';

@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post('create')
  @ApiBody({ type: CreateChatDto })
  async createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.createChat(createChatDto);
  }

  @Post(':id/add-participant')
  @ApiParam({ name: 'id', description: 'ID of the chat' })
  @ApiBody({ type: AddParticipantDto })
  async addParticipant(
    @Param('id', ParseIntPipe) chatId: string,
    @Body() addParticipantDto: AddParticipantDto,
  ) {
    return this.chatsService.addParticipant(chatId, addParticipantDto);
  }
}
