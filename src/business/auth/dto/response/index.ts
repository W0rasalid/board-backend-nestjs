import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsJWT, IsOptional, IsString } from 'class-validator';

export class RespLoginDto {
  @IsJWT()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  token: string;
}

export class RespJwtDecode {
  @IsInt()
  @ApiPropertyOptional()
  @Expose()
  id: number;

  @IsString()
  @ApiPropertyOptional()
  @Expose()
  firstName: string;

  @IsString()
  @ApiPropertyOptional()
  @Expose()
  lastName: string;

  @IsString()
  @ApiPropertyOptional()
  @Expose()
  fullName: string;

  @IsString()
  @ApiPropertyOptional()
  @Expose()
  email: string;

  @IsString()
  @ApiPropertyOptional()
  @Expose()
  role: string;
}

export class RespAuthMeDto {
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  id: number;

  @IsString()
  @ApiPropertyOptional()
  @Expose()
  firstName: string;

  @IsString()
  @ApiPropertyOptional()
  @Expose()
  lastName: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  fullName: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  email: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  role: string;
}
