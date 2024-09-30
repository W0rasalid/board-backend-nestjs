import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { CoreModule } from './core/core.module';
// import { AuthModule } from './business/auth/auth.module';
import { BusinessModule } from './business/business.module';
@Module({
  imports: [ConfigurationModule, CoreModule, BusinessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
