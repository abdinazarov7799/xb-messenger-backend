import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({ example: 'group', description: 'Chat type: private or group' })
  @IsEnum(['private', 'group'], { message: 'Chat type must be either "private" or "group"' })
  type: 'private' | 'group';

  @ApiProperty({ example: 'Developers Chat', description: 'Chat name (for group chats only)', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 1, description: 'ID of the user creating the chat' })
  @IsNumber({}, { message: 'User ID must be a number' })
  userId: string;
}
