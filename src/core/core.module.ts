import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ObservabilityModule } from './observability/observability.module';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import { LoggersModule } from './logger/logger.module';
import { EmailModule } from './mailer/mailer.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, ObservabilityModule, LoggersModule, EmailModule],
})
export class CoreModule {}
