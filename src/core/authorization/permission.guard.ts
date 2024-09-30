import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRoleEnum } from './roles.enum';
import { IAuthUser } from 'src/business/auth/interfaces/auth.interface';
import { TransPostRepository } from 'src/repositories/trans-post.repository';
import { TransCommentRepository } from 'src/repositories/trans-comment.repository';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly postRepo: TransPostRepository,
    private readonly commentRepo: TransCommentRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.body.authUser as IAuthUser;
    const body = request.body;
    const params = request.params;

    const bodyKeys = Object.keys(body).find((key) => key === 'postId' || key === 'commentId');
    const paramsKeys = Object.keys(params).find((key) => key === 'postId' || key === 'commentId');

    if (bodyKeys && bodyKeys.includes('postId')) {
      const post = await this.postRepo.findOneById(body.postId);
      if (post.createId === user.id) {
        return true;
      } else {
        return false;
      }
    }

    if (bodyKeys && bodyKeys.includes('commentId')) {
      const comment = await this.commentRepo.findOneById(body.commentId);
      if (comment.createId === user.id) {
        return true;
      } else {
        return false;
      }
    }

    if (paramsKeys === 'postId') {
      const post = await this.postRepo.findOneById(params.postId);
      if (post.createId === user.id) {
        return true;
      } else {
        return false;
      }
    }

    if (paramsKeys.includes('commentId')) {
      const comment = await this.commentRepo.findOneById(params.commentId);
      if (comment.createId === user.id) {
        return true;
      } else {
        return false;
      }
    }
  }
}
