import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReqLoginDto } from './dto/request';
import { RolesGuard } from 'src/core/authorization/roles.guard';

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() params: ReqLoginDto) {
    return await this.authService.login(params);
  }
}
