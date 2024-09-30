import { Controller, Get, HttpStatus, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { OurBlogService } from './our-blog.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RespSearchPostsDto } from '../board/dto/response';
import { ReqSearchPostDto } from '../board/dto/request';
import { AuthUser } from 'src/common/decorator/user.decorator';
import { IAuthUser } from '../auth/interfaces/auth.interface';

@ApiBearerAuth()
@ApiTags('OurBlog')
@Controller('our-blog')
export class OurBlogController {
  constructor(private readonly ourBlogService: OurBlogService) {}

  @Get()
  @ApiOperation({ summary: 'find post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'ค้นหาข้อมูล Post จาก keyword และ category',
    type: RespSearchPostsDto,
  })
  @UsePipes(ValidationPipe)
  findPosts(@Query() params: ReqSearchPostDto, @AuthUser() user: IAuthUser) {
    return this.ourBlogService.findPosts(params, user);
  }
}
