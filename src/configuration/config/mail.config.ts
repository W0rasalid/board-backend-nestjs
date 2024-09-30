import { registerAs } from '@nestjs/config';
import { IEmailConfig } from '../interfaces/mail.config.interface';

export const emailConfig = registerAs('mail', (): IEmailConfig => {
  return {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || 'service.test2023@gmail.com',
      pass: process.env.EMAIL_PASS || 'csrwctgotshgplkz',
    },
  };
});

export default emailConfig;
