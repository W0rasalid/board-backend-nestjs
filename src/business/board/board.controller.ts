import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { ReqCreatePostDto, ReqEditPostDto, ReqSearchPostDto } from './dto/request';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RespPostsDto, RespSearchPostsDto } from './dto/response';
import { AuthUser } from 'src/common/decorator/user.decorator';
import { IAuthUser } from '../auth/interfaces/auth.interface';
import { PermissionGuard } from 'src/core/authorization/permission.guard';

@ApiTags('Board')
@ApiBearerAuth()
@Controller()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @ApiOperation({ summary: 'find post' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'ค้นหาข้อมูล Post จาก keyword และ category',
    type: RespSearchPostsDto,
  })
  @UsePipes(ValidationPipe)
  findPosts(@Query() params: ReqSearchPostDto) {
    return this.boardService.findPosts(params);
  }

  @Post()
  @ApiOperation({ summary: 'create post' })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
  @UsePipes(ValidationPipe)
  createPost(@Body() params: ReqCreatePostDto, @AuthUser() user: IAuthUser) {
    return this.boardService.createPost(params, user);
  }

  @Put()
  @UseGuards(PermissionGuard)
  @ApiOperation({ summary: 'edit post' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @UsePipes(ValidationPipe)
  editPost(@Body() params: ReqEditPostDto, @AuthUser() user: IAuthUser) {
    return this.boardService.editPost(params, user);
  }

  @Delete(':postId')
  @UseGuards(PermissionGuard)
  @ApiOperation({ summary: 'delete post' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  deletePost(@Param('postId') postId: number, @AuthUser() user: IAuthUser) {
    return this.boardService.deletePost(postId, user);
  }
}
