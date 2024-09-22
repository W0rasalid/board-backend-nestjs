import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReqSearchPostDto {
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  categoryId: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  keyword: string;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({ default: 10 })
  pageSize: number;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({ default: 1 })
  pageCurrent: number;
}

export class ReqCreatePostDto {
  @IsInt()
  @ApiProperty()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}

export class ReqEditPostDto {
  @IsInt()
  @ApiProperty()
  postId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}
