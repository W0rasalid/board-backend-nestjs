import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReqLoginDto {
  @ApiProperty({ default: 'admin' })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ default: '1234' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
