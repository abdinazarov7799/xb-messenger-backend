import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './message.model';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private messageModel: typeof Message) {}

  async sendMessage(chatId: number, senderId: number, mediaType: 'text' | 'file', content: any) {
    return this.messageModel.create({ chatId, senderId, mediaType, content });
  }

  async getMessages(chatId: number) {
    return this.messageModel.findAll({ where: { chatId } });
  }
}
