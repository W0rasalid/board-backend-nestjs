import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { MasCategoryRepository } from 'src/repositories/mas-category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasCategoryEntity } from 'src/entities/mas-category.entity';
import { MasUsersRepository } from 'src/repositories/mas-users.repository';
import { MasUsersEntity } from 'src/entities/mas-users.entity';
import { TransPostRepository } from 'src/repositories/trans-post.repository';
import { TransPostEntity } from 'src/entities/trans-post.entity';
import { TransCommentRepository } from 'src/repositories/trans-comment.repository';
import { TransCommentEntity } from 'src/entities/trans-comment.entity';
import { AuthMiddleWare } from 'src/core/authentication/middleware/auth.middleware';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MasCategoryEntity,
      MasUsersEntity,
      TransPostEntity,
      TransCommentEntity,
    ]),
  ],
  controllers: [BoardController],
  providers: [
    JwtService,
    BoardService,
    MasCategoryRepository,
    MasUsersRepository,
    TransPostRepository,
    TransCommentRepository,
  ],
})
export class BoardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleWare)
      .exclude({ path: '/board', method: RequestMethod.GET })
      .exclude({ path: '/board/:id', method: RequestMethod.GET })
      .forRoutes(BoardController);
  }
}
