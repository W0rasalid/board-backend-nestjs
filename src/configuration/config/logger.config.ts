import { registerAs } from '@nestjs/config';
import { ILokiLoggerConfig } from '../interfaces/logger-config.interface';

const lokiLoggerConfig = registerAs('loki', (): ILokiLoggerConfig => {
  return {
    lokiUrl: process.env.LOKI_URL || 'https://logs-prod-006.grafana.net',
    labels: {
      product: 'Board',
      enviroment: process.env.API_ENVIRONMENT || 'development',
    },
    logToConsole: true,
    gzip: false,
  };
});

export default lokiLoggerConfig;
