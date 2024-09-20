import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { CoreModule } from './core/core.module';
import { AuthenticationService } from './core/authentication/authentication.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ConfigurationModule, CoreModule],
  controllers: [AppController],
  providers: [AppService, AuthenticationService, JwtService],
})
export class AppModule {}
