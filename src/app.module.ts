import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { CoreModule } from './core/core.module';
import { AuthenticationService } from './core/authentication/authentication.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './business/auth/auth.module';

@Module({
  imports: [ConfigurationModule, CoreModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
