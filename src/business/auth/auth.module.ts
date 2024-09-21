import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthenticationModule } from 'src/core/authentication/authentication.module';
import { AuthenticationService } from 'src/core/authentication/authentication.service';

@Module({
  imports: [AuthenticationModule],
  controllers: [AuthController],
  providers: [AuthService, AuthenticationService],
})
export class AuthModule {}
