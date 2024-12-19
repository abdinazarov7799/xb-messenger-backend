import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddParticipantDto {
  @ApiProperty({ example: 1, description: 'ID of the user to be added' })
  @IsNumber({}, { message: 'User ID must be a number' })
  userId: string;
}
