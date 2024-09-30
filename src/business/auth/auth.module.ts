import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthenticationModule } from 'src/core/authentication/authentication.module';
import { AuthenticationService } from 'src/core/authentication/authentication.service';
import { AuthMiddleWare } from 'src/core/authentication/middleware/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasUsersEntity } from 'src/entities/mas-users.entity';
import { MasUsersRepository } from 'src/repositories/mas-users.repository';
import { MailService } from 'src/core/mailer/mailer.service';

@Module({
  imports: [AuthenticationModule, TypeOrmModule.forFeature([MasUsersEntity])],
  controllers: [AuthController],
  providers: [AuthService, AuthenticationService, MasUsersRepository, MailService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleWare)
      .exclude({ path: '/auth/login', method: RequestMethod.POST })
      .exclude({ path: '/auth/register', method: RequestMethod.POST })
      .exclude({ path: '/auth/activate', method: RequestMethod.GET })
      .forRoutes(AuthController);
  }
}
