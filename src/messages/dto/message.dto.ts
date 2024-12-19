import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty({ example: 1, description: 'Message ID' })
  id: string;

  @ApiProperty({ example: 1, description: 'Chat ID to which the message belongs' })
  chatId: string;

  @ApiProperty({ example: 2, description: 'ID of the user who sent the message' })
  senderId: string;

  @ApiProperty({ example: 'text', description: 'Type of the message' })
  mediaType: 'text' | 'file';

  @ApiProperty({ example: 'Hello, world!', description: 'Content of the message' })
  content: string;

  @ApiProperty({ example: '2024-12-19T03:21:14.000Z', description: 'Date and time the message was created' })
  createdAt: Date;
}
