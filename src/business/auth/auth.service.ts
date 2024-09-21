import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReqLoginDto } from './dto/request';
import { LokiLogger } from 'src/core/logger';
import { AuthenticationService } from 'src/core/authentication/authentication.service';
import { loginDataMock } from 'src/_mockdata/login.mock';

@Injectable()
export class AuthService {
  private readonly lokiLogger = new LokiLogger(AuthService.name);
  constructor(private readonly authService: AuthenticationService) {}

  async login(params: ReqLoginDto) {
    try {
      const hash = this.authService.hashBcrypt(params.password, loginDataMock.salt);

      const passwordCompare = await this.authService.compareBcrypt(
        params.password,
        loginDataMock.pass,
      );

      return new HttpException('suscess', HttpStatus.CREATED);
    } catch (error) {}
  }
}
