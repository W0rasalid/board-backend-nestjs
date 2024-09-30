import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReqCreateCommentDto {
  @IsInt()
  @ApiProperty()
  postId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}

export class ReqSearchCommentDto {
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  postId: number;

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

export class ReqEditCommentDto {
  @IsInt()
  @ApiProperty()
  commentId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}
