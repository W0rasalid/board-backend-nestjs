import { Module } from '@nestjs/common';
import { LokiLoggerModule } from './nest-loki.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    LokiLoggerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get('loki'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class LoggersModule {}
