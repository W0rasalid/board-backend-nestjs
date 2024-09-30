import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { LokiLogger } from 'src/core/logger';
import { TransCommentRepository } from 'src/repositories/trans-comment.repository';
import { ReqCreateCommentDto, ReqEditCommentDto, ReqSearchCommentDto } from './dto/request';
import { plainToInstance } from 'class-transformer';
import { PageResult, Resp, RespSuccess } from 'src/common/dto/resp-common.dto';
import { RespCommentDto } from './dto/response';
import { TransCommentEntity } from 'src/entities/trans-comment.entity';
import { IAuthUser } from '../auth/interfaces/auth.interface';

@Injectable()
export class CommentService {
  private readonly lokiLogger = new LokiLogger(CommentService.name);
  constructor(private readonly commentRepo: TransCommentRepository) {}

  async findCommentList(params: ReqSearchCommentDto) {
    try {
      const data = await this.commentRepo.findByPostId(params);

      const resp = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        message: 'success',
        result: plainToInstance(RespCommentDto, data, {
          excludeExtraneousValues: true,
        }),
      } as RespSuccess<PageResult<RespCommentDto>>;

      return resp;
    } catch (error) {
      this.lokiLogger.error(`${error.message}`, `trace :`, undefined, {
        controller: 'CommentController',
        function: this.findCommentList.name,
        service: CommentService.name,
      });

      throw error;
    }
  }

  async createComment(params: ReqCreateCommentDto, user: IAuthUser) {
    try {
      const newData = new TransCommentEntity();
      newData.postId = params.postId;
      newData.description = params.description;
      newData.isDelete = false;
      newData.createId = user.id;
      newData.createName = user.fullName;
      newData.createDate = new Date();
      await this.commentRepo.saveData(newData);

      const resp: Resp = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        message: 'success',
      };

      return resp;
    } catch (error) {
      this.lokiLogger.error(`${error.message}`, `trace :`, undefined, {
        controller: 'CommentController',
        function: this.createComment.name,
        service: CommentService.name,
      });

      throw error;
    }
  }

  async editComment(params: ReqEditCommentDto, user: IAuthUser) {
    try {
      const data = await this.commentRepo.findOneById(params.commentId);
      if (!data) {
        throw new Error('Data not found');
      }

      if (user.id !== data.createId) {
        throw new ForbiddenException('You are not authorized to edit this comment');
      }

      data.description = params.description;
      data.modifyDate = new Date();
      data.modifyId = user.id;
      data.modifyName = user.fullName;
      await this.commentRepo.saveData(data);

      const resp: Resp = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        message: 'success',
      };

      return resp;
    } catch (error) {
      this.lokiLogger.error(`${error.message}`, `trace :`, undefined, {
        controller: 'CommentController',
        function: this.editComment.name,
        service: CommentService.name,
      });

      throw error;
    }
  }

  async deleteComment(commentId: number, user: IAuthUser) {
    try {
      const data = await this.commentRepo.findOneById(commentId);
      if (!data) {
        throw new Error('Data not found');
      }
    } catch (error) {
      this.lokiLogger.error(`${error.message}`, `trace :`, undefined, {
        controller: 'CommentController',
        function: this.deleteComment.name,
        service: CommentService.name,
      });

      throw error;
    }
  }
}
