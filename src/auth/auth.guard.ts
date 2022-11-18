import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from 'jwt/jwt.service';
import { IUser } from 'users/users.model';
import { UsersService } from 'users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      const userWithJwt = this.jwtService.decodeToken<IUser>(token);

      const user = await this.userService.getUserByLogin(userWithJwt.login);

      req.user = {
        ...userWithJwt,
        _id: user._id,
      };

      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }
}
