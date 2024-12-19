import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddParticipantDto {
  @ApiProperty({ example: 1, description: 'ID of the user to be added' })
  @IsNumber({}, { message: 'User ID must be a number' })
  userId: string;

  @ApiProperty({ example: 1, description: 'ID of the admin adding the user' })
  @IsNumber({}, { message: 'AddedBy ID must be a number' })
  addedBy: string;
}
