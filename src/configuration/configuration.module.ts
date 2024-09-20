import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import openTelemetryConfig from './config/opentelemetry.config';
import jwtConfig from './config/jwt.config';
import dbConfig from './config/database.config';
import lokiLoggerConfig from './config/logger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [appConfig, openTelemetryConfig, jwtConfig, dbConfig, lokiLoggerConfig],
    }),
  ],
})
export class ConfigurationModule {}
