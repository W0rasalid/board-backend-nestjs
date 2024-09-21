import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'src/configuration/config/app.config';
import dbConfig, { DatabaseConfig } from 'src/configuration/config/database.config';

@Module({
  imports: [
    // database config
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
  ],
})
export class DatabaseModule {}
