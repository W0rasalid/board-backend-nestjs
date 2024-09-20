import { registerAs } from '@nestjs/config';
import { IJwtConfig } from '../interfaces/jwt-config.interface';

const jwtConfig = registerAs('jwt', (): IJwtConfig => {
  return {
    secret: process.env.JWT_SECRET_KEY || 'secretKey',
    global: true,
    signOptions: {
      expiresIn: '32400s',
    },
  };
});

export default jwtConfig;
