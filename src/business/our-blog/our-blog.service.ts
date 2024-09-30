import { HttpStatus, Injectable } from '@nestjs/common';
import { PageResult, RespSuccess } from 'src/common/dto/resp-common.dto';
import { LokiLogger } from 'src/core/logger';
import { TransPostRepository } from 'src/repositories/trans-post.repository';
import { RespPostsDto, RespSearchPostsDto } from '../board/dto/response';
import { plainToInstance } from 'class-transformer';
import { ReqSearchPostDto } from '../board/dto/request';
import { IAuthUser } from '../auth/interfaces/auth.interface';

@Injectable()
export class OurBlogService {
  private readonly lokiLogger = new LokiLogger(OurBlogService.name);

  constructor(private readonly postRepo: TransPostRepository) {}

  async findPosts(params: ReqSearchPostDto, user: IAuthUser) {
    try {
      const data = await this.postRepo.findBySearch(params, user);

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
        service: OurBlogService.name,
      });

      throw error;
    }
  }

  async findPostDetails(postId: number, user: IAuthUser) {
    try {
      const data = await this.postRepo.findOneById(postId);

      const resp: RespSuccess<RespPostsDto> = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        message: 'success',
        result: plainToInstance(RespPostsDto, data, {
          excludeExtraneousValues: true,
        }),
      };

      return resp;
    } catch (error) {
      this.lokiLogger.error(`${error.message}`, `trace :`, undefined, {
        controller: 'AuthController',
        function: this.findPosts.name,
        service: OurBlogService.name,
      });

      throw error;
    }
  }
}
