import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class Resp {
  @IsNumber()
  @Expose()
  @ApiProperty({ example: '200' })
  statusCode: number;

  @IsString()
  @Expose()
  @ApiProperty({ example: 'OK' })
  statusText: string;

  @IsString()
  @Expose()
  @ApiProperty({ example: 'success' })
  message: string;
}

export class RespSuccess<T> extends Resp {
  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  result: T;
}

export class PageProperty {
  @IsNumber()
  @Expose()
  @ApiProperty({ example: 1 })
  currentPage: number;

  @IsNumber()
  @Expose()
  @ApiProperty({ example: 10 })
  pageCount: number;

  @IsNumber()
  @Expose()
  @ApiProperty({ example: 10 })
  pageSize: number;

  @IsNumber()
  @Expose()
  @ApiProperty({ example: 95 })
  rowCount: number;
}

export class PageResult<T> extends PageProperty {
  [x: string]: any;
  @Expose()
  data: T[];
}

export class RespError extends Resp {
  @Expose()
  error?: any;
}
