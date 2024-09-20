import { registerAs } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { IDatabaseConfig } from '../interfaces/database-config.interface';

export const dbConfig = registerAs<IDatabaseConfig>('database', () => {
  return {
    name: 'default',
    type: 'mssql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 1433,
    database: process.env.DB_DATABASE || '',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD,
    schema: process.env.DB_SCHEMA,
    // synchronize: false,
    autoLoadEntities: true,
    options: {
      trustServerCertificate: true,
    },
  };
});

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions() {
    return this.configService.get<IDatabaseConfig>('database');
  }
}

export default dbConfig;
