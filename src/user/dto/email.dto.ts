import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
