import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OurBlogService } from './our-blog.service';
import { OurBlogController } from './our-blog.controller';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasUsersEntity } from 'src/entities/mas-users.entity';
import { TransPostEntity } from 'src/entities/trans-post.entity';
import { TransPostRepository } from 'src/repositories/trans-post.repository';
import { AuthMiddleWare } from 'src/core/authentication/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([MasUsersEntity, TransPostEntity])],
  controllers: [OurBlogController],
  providers: [JwtService, OurBlogService, TransPostRepository],
})
export class OurBlogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleWare).forRoutes(OurBlogController);
  }
}
