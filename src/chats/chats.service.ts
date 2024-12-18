import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { ChatParticipant } from './chat-participant.model';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat) private chatModel: typeof Chat,
    @InjectModel(ChatParticipant) private chatParticipantModel: typeof ChatParticipant,
  ) {}

  async createChat(userId: number, type: 'private' | 'group', name?: string) {
    const chat = await this.chatModel.create({ type, name });
    await this.chatParticipantModel.create({
      chatId: chat.id,
      userId,
      isAdmin: type === 'group',
    });
    return chat;
  }

  async addParticipant(chatId: number, userId: number, addedBy: number) {
    const admin = await this.chatParticipantModel.findOne({
      where: { chatId, userId: addedBy, isAdmin: true },
    });

    if (!admin) {
      throw new Error('Only admins can add participants');
    }

    return this.chatParticipantModel.create({ chatId, userId });
  }
}
