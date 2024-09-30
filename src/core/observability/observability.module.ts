import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenTelemetryModule } from 'nestjs-otel';
import { IOpenTelemetryConfig } from 'src/configuration/interfaces/opentelemetry-config.interface';

@Module({
  imports: [
    OpenTelemetryModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get<IOpenTelemetryConfig>('otel'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class ObservabilityModule {}
