import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReqSearchPostDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  categoryId: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  keyword: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({ default: 10 })
  pageSize: number;

  @Type(() => Number)
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
