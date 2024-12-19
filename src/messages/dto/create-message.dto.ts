import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 1, description: 'ID of the chat' })
  @IsNumber()
  chatId: string;

  @ApiProperty({ example: 2, description: 'ID of the sender user' })
  @IsNumber()
  senderId: string;

  @ApiProperty({ example: 'text', description: 'Media type of the message', enum: ['text', 'file'] })
  @IsEnum(['text', 'file'])
  mediaType: 'text' | 'file';

  @ApiProperty({ example: '{"text": "Hello!"}', description: 'Content of the message in JSON format' })
  @IsNotEmpty()
  content: any;
}
