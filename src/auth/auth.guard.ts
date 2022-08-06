import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from 'jwt/jwt.service';
import { Observable } from 'rxjs';
import { IUser } from 'users/users.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      req.user = this.jwtService.decodeToken<IUser>(token);

      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }
}
