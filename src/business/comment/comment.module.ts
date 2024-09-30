import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TransCommentRepository } from 'src/repositories/trans-comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransCommentEntity } from 'src/entities/trans-comment.entity';
import { TransPostRepository } from 'src/repositories/trans-post.repository';
import { TransPostEntity } from 'src/entities/trans-post.entity';
import { AuthMiddleWare } from 'src/core/authentication/middleware/auth.middleware';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([TransCommentEntity, TransPostEntity])],
  controllers: [CommentController],
  providers: [JwtService, CommentService, TransCommentRepository, TransPostRepository],
})
export class CommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleWare)
      .exclude({ path: '/comment', method: RequestMethod.GET })
      .forRoutes(CommentController);
  }
}
