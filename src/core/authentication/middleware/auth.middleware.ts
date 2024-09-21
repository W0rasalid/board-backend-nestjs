import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { IAuthUser } from 'src/business/auth/interfaces/auth.interface';

// entity

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  constructor(
    private jwtService: JwtService, // @InjectRepository(MasterUsersEntity) // private readonly userRepo: Repository<MasterUsersEntity>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers.authorization;
      if (token === undefined) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .send(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));
      } else {
        token = req.headers.authorization.replace('Bearer ', '');

        const jwtDecode = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET_KEY,
        });

        if (jwtDecode) {
          const authUser: IAuthUser = {
            id: jwtDecode.id,
            firstName: jwtDecode.firstName,
            lastName: jwtDecode.lastName,
            fullName: jwtDecode.fullName,
            email: jwtDecode.email,
            role: jwtDecode.role,
          };

          // req.user = { ...req.user, authUser };
          req.body = { ...req.body, authUser };
          next();
        } else {
          return res
            .status(HttpStatus.UNAUTHORIZED)
            .send(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));
        }
      }
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).send(error);
    }
  }
}
