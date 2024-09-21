import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEmailConfig } from 'src/configuration/interfaces/mail.config.interface';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport: {
          ...config.get<IEmailConfig>('mail'),
        },
      }),

      inject: [ConfigService],
    }),
  ],
})
export class EmailModule {}
