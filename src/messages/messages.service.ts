import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './message.model';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private readonly messageModel: typeof Message) {}

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageModel.create({
      chatId: createMessageDto.chatId,
      senderId: createMessageDto.senderId,
      mediaType: createMessageDto.mediaType,
      content: createMessageDto.content,
    });
  }

  async getMessagesByChat(chatId: string): Promise<Message[]> {
    return this.messageModel.findAll({
      where: { chatId },
      include: ['chat', 'sender'],
      order: [['createdAt', 'ASC']],
    });
  }
}
