import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { UsersService } from 'users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from 'jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);

    return {
      user,
      token: this.jwtService.generateToken({
        login: user.login,
      }),
    };
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(userDto.login);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким логином уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.createUser({
      login: userDto.login,
      password: await bcrypt.hash(userDto.password, 5),
    });

    return {
      user,
      token: this.jwtService.generateToken({
        login: user.login,
      }),
    };
  }

  async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByLogin(userDto.login);
    const areSame = await bcrypt.compare(userDto.password, user.password);
    if (areSame && user) {
      return user;
    }
    throw new UnauthorizedException('Неправильный логин или пароль');
  }
}
