import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ReqLoginDto, ReqUserRegisterDto } from './dto/request';
import { LokiLogger } from 'src/core/logger';
import { AuthenticationService } from 'src/core/authentication/authentication.service';
import { loginDataMock } from 'src/_mockdata/login.mock';
import { AuthUser } from 'src/common/decorator/user.decorator';
import { IAuthUser } from './interfaces/auth.interface';
import { RespAuthMeDto, RespJwtDecode, RespLoginDto } from './dto/response';
import { Resp, RespSuccess } from 'src/common/dto/resp-common.dto';
import { plainToInstance } from 'class-transformer';
import { MasUsersRepository } from 'src/repositories/mas-users.repository';
import { MailService } from 'src/core/mailer/mailer.service';
import { MasUsersEntity } from 'src/entities/mas-users.entity';

@Injectable()
export class AuthService {
  private readonly lokiLogger = new LokiLogger(AuthService.name);
  constructor(
    private readonly authService: AuthenticationService,
    private readonly userRepo: MasUsersRepository,
    private readonly mailService: MailService,
  ) {}

  async login(params: ReqLoginDto) {
    try {
      const user = await this.userRepo.findOneByUserName(params.userName);
      const passwordCompare = await this.authService.compareBcrypt(params.password, user.password);

      if (!passwordCompare) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const payload: IAuthUser = {
        id: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        fullName: `${user.firstName} ${user.lastName}`,
        role: user.userRole,
      };

      const token = await this.authService.jwtSignToken(payload, '32400s');

      const resp: RespSuccess<RespLoginDto> = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        message: 'success',
        result: plainToInstance(RespLoginDto, { token }),
      };

      return resp;
    } catch (error) {
      this.lokiLogger.error(
        `(${error.response.statusCode}) ${error.message}`,
        `trace :`,
        undefined,
        {
          statusCode: error.response.statusCode,
          error: error.response.statusText,
          controller: 'AuthController',
          function: this.login.name,
          service: AuthService.name,
        },
      );

      throw error;
    }
  }

  async checkAuth(token: string) {
    try {
      const jwtDecode: RespJwtDecode = await this.authService.jwtVerifyToken(token);
      const user = await this.userRepo.findOneById(jwtDecode.id);

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      const resp: RespSuccess<RespAuthMeDto> = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        message: 'success',
        result: plainToInstance(RespAuthMeDto, user, {
          excludeExtraneousValues: true,
        }),
      };
      return resp;
    } catch (error) {
      this.lokiLogger.error(
        `(${error.response.statusCode}) ${error.message}`,
        `trace :`,
        undefined,
        {
          statusCode: error.response.statusCode,
          error: error.response.statusText,
          controller: 'AuthController',
          function: this.checkAuth.name,
          service: AuthService.name,
        },
      );

      throw error;
    }
  }

  async register(params: ReqUserRegisterDto) {
    try {
      const user = await this.userRepo.findOneByUserName(params.userName);
      const email = await this.userRepo.findOneByEmail(params.email);
      const salt = process.env.SALT;

      if (user && email) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }

      const newData = new MasUsersEntity();
      newData.userName = params.userName;
      newData.password = this.authService.hashBcrypt(params.password, salt);
      newData.email = params.email;
      newData.firstName = params.firstName;
      newData.lastName = params.lastName;
      newData.userRole = 'user';
      newData.isActive = false;
      newData.isDelete = false;
      newData.createDate = new Date();
      await this.userRepo.saveData(newData);

      const payload = { userName: params.userName, email: params.email };
      const token = await this.authService.jwtSignToken(payload, '32400s');
      const inviteUrl = await this.mailService.sendMailRegister(
        params.userName,
        params.email,
        token,
      );

      const resp: RespSuccess<{ url: string }> = {
        statusCode: HttpStatus.OK,
        statusText: HttpStatus[HttpStatus.OK],
        message: 'Invite user success',
        result: {
          url: inviteUrl,
        },
      };

      return resp;
    } catch (error) {
      this.lokiLogger.error(
        `(${error.response.statusCode}) ${error.message}`,
        `trace :`,
        undefined,
        {
          statusCode: error.response.statusCode,
          error: error.response.statusText,
          controller: 'AuthController',
          function: this.register.name,
          service: AuthService.name,
        },
      );

      throw error;
    }
  }

  async activateUser(token: string) {
    try {
      const jwtDecode: RespJwtDecode = await this.authService.jwtVerifyToken(token);
      const user = await this.userRepo.findOneByEmail(jwtDecode.email);
      console.log(user);

      if (user.isActive) {
        throw new BadRequestException('User already activated');
      } else {
        user.isActive = true;
        await this.userRepo.saveData(user);

        const resp: Resp = {
          statusCode: HttpStatus.OK,
          statusText: HttpStatus[HttpStatus.OK],
          message: 'success',
        };

        return resp;
      }
    } catch (error) {
      this.lokiLogger.error(
        `(${error.response.statusCode}) ${error.message}`,
        `trace :`,
        undefined,
        {
          statusCode: error.response.statusCode,
          error: error.response.statusText,
          controller: 'AuthController',
          function: this.activateUser.name,
          service: AuthService.name,
        },
      );

      throw error;
    }
  }
}
