import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { IJwtConfig } from 'src/configuration/interfaces/jwt-config.interface';
// import { IJwtConfig } from 'src/config/interfaces/jwt-config.interface';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get<IJwtConfig>('jwt'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class AuthenticationModule {}
