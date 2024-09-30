import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class RespSearchPostsDto {
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
  @Type(() => RespPostsDto)
  @ApiPropertyOptional({ type: () => [RespPostsDto] })
  @Expose()
  data?: RespPostsDto[];
}

export class AuthorSchemaDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  lastName: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  profileImage: string;
}

export class CategorySchemaDto {
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  categoryId: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  categoryName: string;
}

export class RespPostsDto {
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  postId: number;

  @IsObject()
  @Type(() => CategorySchemaDto)
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  category: CategorySchemaDto;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  categoryName: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  description: string;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  cntComment: number;

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
}

export class RespPostsDetailsDto {
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  postId: number;

  @IsObject()
  @Type(() => CategorySchemaDto)
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  category: CategorySchemaDto;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  categoryName: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  description: string;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  cntComment: number;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  createDate: Date;

  @IsObject()
  @Type(() => AuthorSchemaDto)
  @IsOptional()
  @ApiPropertyOptional()
  @Expose({ name: 'userInfo' })
  author: AuthorSchemaDto;
}
