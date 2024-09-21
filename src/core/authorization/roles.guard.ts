import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRoleEnum } from './roles.enum';
import { IAuthUser } from 'src/business/auth/interfaces/auth.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.body.authUser as IAuthUser;

    if (user.role === UserRoleEnum.ADMIN) {
      return true;
    } else {
      return false;
    }
  }
}
