import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsJWT, IsNotEmpty, IsString } from 'class-validator';

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

export class ReqUserRegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsEmail()
  @ApiProperty()
  email: string;
}

export class ReqUserActivateDto {
  @IsJWT()
  @IsNotEmpty()
  @ApiProperty()
  token: string;
}

export class ReqSignInGoogleDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  familyName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  givenName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  picture: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  sub: string;
}
