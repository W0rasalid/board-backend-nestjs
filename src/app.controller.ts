import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LokiLogger } from './core/logger';
import { MailerService } from '@nestjs-modules/mailer';

@Controller()
export class AppController {
  private readonly lokiLogger = new LokiLogger(AppController.name);
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailerService,
  ) {}

  @Get()
  getHello(): string {
    this.lokiLogger.info('Test Hello', undefined, {
      controller: 'AuthController',
      function: this.getHello.name,
      service: AppController.name,
    });
    return this.appService.getHello();
  }

  @Get('test-mail')
  async testMail() {
    await this.mailService.sendMail({
      to: 'worasalid@gmail.com',
      from: `Board`,
      subject: 'Test Mail',
      html: '<b>Welcome to Board</b>',
    });
  }
}
