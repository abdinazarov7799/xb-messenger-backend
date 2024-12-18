import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'johndoe', description: 'Foydalanuvchi nomi' })
  username: string;

  @ApiProperty({ example: 'password123', description: 'Foydalanuvchi paroli' })
  password: string;
}
