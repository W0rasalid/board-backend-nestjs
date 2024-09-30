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
import { CommentService } from './comment.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReqCreateCommentDto, ReqEditCommentDto, ReqSearchCommentDto } from './dto/request';
import { AuthUser } from 'src/common/decorator/user.decorator';
import { IAuthUser } from '../auth/interfaces/auth.interface';
import { PermissionGuard } from 'src/core/authorization/permission.guard';
import { RespCommentDto } from './dto/response';

@ApiTags('Comment')
@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @ApiOperation({ summary: 'comment list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'ค้นหาข้อมูล Comment จาก postId',
    isArray: true,
    type: RespCommentDto,
  })
  @UsePipes(ValidationPipe)
  findCommentList(@Query() params: ReqSearchCommentDto) {
    return this.commentService.findCommentList(params);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create comment' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
  })
  @UsePipes(ValidationPipe)
  createComment(@Body() params: ReqCreateCommentDto, @AuthUser() user: IAuthUser) {
    return this.commentService.createComment(params, user);
  }

  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'edit comment' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @UseGuards(PermissionGuard)
  @UsePipes(ValidationPipe)
  editComment(@Body() params: ReqEditCommentDto, @AuthUser() user: IAuthUser) {
    return this.commentService.editComment(params, user);
  }

  @Delete(':commentId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'delete comment' })
  @UseGuards(PermissionGuard)
  deleteComment(@Param('commentId') commentId: number, @AuthUser() user: IAuthUser) {
    return this.commentService.deleteComment(commentId, user);
  }
}
