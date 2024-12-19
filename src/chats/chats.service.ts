import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { ChatParticipant } from './chat-participant.model';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat) private chatModel: typeof Chat,
    @InjectModel(ChatParticipant) private chatParticipantModel: typeof ChatParticipant,
  ) {}

  async createChat(createChatDto: CreateChatDto) {
    const chat = await this.chatModel.create({
      type: createChatDto.type,
      name: createChatDto.name,
    });

    await this.chatParticipantModel.create({
      chatId: chat.id,
      userId: createChatDto.userId,
      isAdmin: createChatDto.type === 'group',
    });

    return chat;
  }

  async addParticipant(chatId: string, userId: string, addedBy: string) {
    const admin = await this.chatParticipantModel.findOne({
      where: { chatId, userId: addedBy, isAdmin: true },
    });

    if (!admin) {
      throw new Error('Only admins can add participants to the chat.');
    }

    return this.chatParticipantModel.create({
      chatId,
      userId,
      isAdmin: false,
    });
  }
}
