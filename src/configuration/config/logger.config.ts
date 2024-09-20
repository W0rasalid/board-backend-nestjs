import { registerAs } from '@nestjs/config';
import { ILokiLoggerConfig } from '../interfaces/logger-config.interface';

const lokiLoggerConfig = registerAs('loki', (): ILokiLoggerConfig => {
  return {
    lokiUrl: process.env.LOKI_URL || 'http://localhost:3100',
    labels: {
      product: 'ME2WE-Ticket-Management',
      enviroment: process.env.API_ENVIRONMENT || 'development',
    },
    logToConsole: true,
    gzip: false,
  };
});

export default lokiLoggerConfig;
