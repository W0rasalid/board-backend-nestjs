import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class RespCommentDto {
  @IsNumber()
  @ApiPropertyOptional()
  @Expose()
  currentPage?: number;

  @IsNumber()
  @ApiPropertyOptional()
  @Expose()
  pageCount?: number;

  @IsNumber()
  @ApiPropertyOptional()
  @Expose()
  pageSize?: number;

  @IsNumber()
  @ApiPropertyOptional()
  @Expose()
  rowCount?: number;

  @IsArray()
  @Type(() => CommentSchemaDto)
  @ApiPropertyOptional({ type: () => [CommentSchemaDto] })
  @Expose()
  data?: CommentSchemaDto[];
}

export class CommentSchemaDto {
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  postId: number;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  commentId: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  description: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  createName: string;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  createDate: Date;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  author: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  profileImage: string;
}
