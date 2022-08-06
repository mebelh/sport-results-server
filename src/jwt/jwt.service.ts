import { Injectable } from '@nestjs/common';
import { JwtService as JWTService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private jwt: JWTService) {}

  generateToken<T extends object>(obj: T): string {
    return this.jwt.sign(obj);
  }

  decodeToken<T extends object>(jwt: string): T {
    return this.jwt.decode(jwt) as T;
  }
}
