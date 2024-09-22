import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { CommentModule } from './comment/comment.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'board',
        module: BoardModule,
      },
      {
        path: 'comment',
        module: CommentModule,
      },
    ]),
    AuthModule,
    BoardModule,
    CommentModule,
  ],
})
export class BusinessModule {}
