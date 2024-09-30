import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LokiLogger } from '../logger';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  private readonly lokiLogger = new LokiLogger(AuthenticationService.name);
  constructor(private readonly jwtService: JwtService) {}

  genSaltBcrypt(saltRounds: number) {
    try {
      const salt = bcrypt.genSaltSync(saltRounds);
      return salt;
    } catch (error) {
      this.lokiLogger.error(error.message, undefined, undefined, {
        function: this.genSaltBcrypt.name,
        service: AuthenticationService.name,
      });
      throw error;
    }
  }

  hashBcrypt(text: string, salt: string) {
    try {
      const hash = bcrypt.hashSync(text, salt);
      return hash;
    } catch (error) {
      this.lokiLogger.error(error.message, undefined, undefined, {
        function: this.hashBcrypt.name,
        service: AuthenticationService.name,
      });
      throw error;
    }
  }

  async compareBcrypt(text: string, hash: string) {
    try {
      const result = await bcrypt.compare(text, hash);
      return result;
    } catch (error) {
      this.lokiLogger.error(error.message, undefined, undefined, {
        function: this.compareBcrypt.name,
        service: AuthenticationService.name,
      });
      throw error;
    }
  }

  async jwtSignToken(payload: object, expiresIn: string) {
    try {
      const token = await this.jwtService.signAsync(payload, {
        expiresIn: expiresIn,
        secret: process.env.JWT_SECRET_KEY,
      });
      return token;
    } catch (error) {
      this.lokiLogger.error(error.message, undefined, undefined, {
        function: this.jwtSignToken.name,
        service: AuthenticationService.name,
      });
      throw error;
    }
  }

  async jwtVerifyToken(token: string) {
    try {
      const jwtDecode = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      if (jwtDecode) {
        return jwtDecode;
      }
    } catch (error) {
      throw error;
    }
  }
}
