import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { MasCategoryRepository } from 'src/repositories/mas-category.repository';
import { MasUsersRepository } from 'src/repositories/mas-users.repository';
import { TransCommentRepository } from 'src/repositories/trans-comment.repository';
import { TransPostRepository } from 'src/repositories/trans-post.repository';
import { ReqCreatePostDto, ReqEditPostDto, ReqSearchPostDto } from './dto/request';
import { LokiLogger } from 'src/core/logger';
import { PageResult, Resp, RespSuccess } from 'src/common/dto/resp-common.dto';
import { RespPostsDto, RespSearchPostsDto } from './dto/response';
import { plainToInstance } from 'class-transformer';
import { TransPostEntity } from 'src/entities/trans-post.entity';
import { IAuthUser } from '../auth/interfaces/auth.interface';

@Injectable()
export class BoardService {
  private readonly lokiLogger = new LokiLogger(BoardService.name);
  constructor(
    private readonly categoryRepo: MasCategoryRepository,
    private readonly userRepo: MasUsersRepository,
    private readonly postRepo: TransPostRepository,
    private readonly commentRepo: TransCommentRepository,
  ) {}

  async findPosts(params: ReqSearchPostDto) {
    try {
      const data = await this.postRepo.findBySearch(params);

      const resp = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        message: 'success',
        result: plainToInstance(RespSearchPostsDto, data, {
          excludeExtraneousValues: true,
        }),
      } as RespSuccess<PageResult<RespSearchPostsDto>>;

      return resp;
    } catch (error) {
      this.lokiLogger.error(`${error.message}`, `trace :`, undefined, {
        controller: 'AuthController',
        function: this.findPosts.name,
        service: BoardService.name,
      });

      throw error;
    }
  }

  async createPost(params: ReqCreatePostDto, user: IAuthUser) {
    try {
      const newPost = new TransPostEntity();
      newPost.categoryId = params.categoryId;
      newPost.title = params.title;
      newPost.description = params.description;
      newPost.isDelete = false;
      newPost.createId = user.id;
      newPost.createName = user.fullName;
      newPost.createDate = new Date();
      await this.postRepo.saveData(newPost);

      const resp: Resp = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        message: 'success',
      };

      return resp;
    } catch (error) {
      this.lokiLogger.error(`${error.message}`, `trace :`, undefined, {
        controller: 'BoardController',
        function: this.createPost.name,
        service: BoardService.name,
      });

      throw error;
    }
  }

  async editPost(params: ReqEditPostDto, user: IAuthUser) {
    try {
      const data = await this.postRepo.findOneById(params.postId);
      if (!data) {
        throw new NotFoundException('Post not found');
      }

      data.title = params.title;
      data.description = params.description;
      data.modifyId = user.id;
      data.modifyName = user.fullName;
      data.modifyDate = new Date();
      await this.postRepo.saveData(data);

      const resp: Resp = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        message: 'success',
      };

      return resp;
    } catch (error) {
      this.lokiLogger.error(`${error.message}`, `trace :`, undefined, {
        controller: 'BoardController',
        function: this.editPost.name,
        service: BoardService.name,
      });

      throw error;
    }
  }

  async deletePost(postId: number, user: IAuthUser) {
    try {
      const data = await this.postRepo.findOneById(postId);
      if (!data) {
        throw new NotFoundException('Post not found');
      }

      data.isDelete = true;
      data.modifyId = user.id;
      data.modifyName = user.fullName;
      data.modifyDate = new Date();
      await this.postRepo.saveData(data);
    } catch (error) {
      this.lokiLogger.error(`${error.message}`, `trace :`, undefined, {
        controller: 'BoardController',
        function: this.deletePost.name,
        service: BoardService.name,
      });

      throw error;
    }
  }
}
