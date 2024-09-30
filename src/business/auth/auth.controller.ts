import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReqLoginDto, ReqUserActivateDto, ReqUserRegisterDto } from './dto/request';
import { RolesGuard } from 'src/core/authorization/roles.guard';
import { LoginToken } from 'src/common/decorator/token.decorator';
import { RespLoginDto } from './dto/response';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'ข้อมูล Login',
    type: RespLoginDto,
  })
  @UsePipes(ValidationPipe)
  async login(@Body() params: ReqLoginDto) {
    return await this.authService.login(params);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Authorization Me' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'ข้อมูล Authorization',
  })
  checkAuth(@LoginToken() token: string) {
    return this.authService.checkAuth(token);
  }

  @Get('test-role')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'test role' })
  testRole() {
    return 'test role';
  }

  @Post('register')
  @ApiOperation({ summary: 'User Register' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User Register',
  })
  @UsePipes(ValidationPipe)
  async register(@Body() params: ReqUserRegisterDto) {
    return await this.authService.register(params);
  }

  @Get('activate')
  @ApiOperation({ summary: 'User activate' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @UsePipes(ValidationPipe)
  activateUser(@Query() query: ReqUserActivateDto) {
    return this.authService.activateUser(query.token);
  }
}
