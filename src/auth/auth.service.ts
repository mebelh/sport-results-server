import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthCode } from 'auth/authCode.model';
import { Model } from 'mongoose';
import { AuthUserDto, SendAuthCodeDto } from 'users/dto/create-user.dto';
import { UsersService } from 'users/users.service';
import { JwtService } from 'jwt/jwt.service';
import fetch from 'cross-fetch';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @InjectModel(AuthCode.name)
    private readonly authCodeModel: Model<AuthCode>,
  ) {}

  async login(userDto: AuthUserDto) {
    const { code } = await this.authCodeModel
      .findOne({
        phone: userDto.phone,
      })
      .exec();

    if (code !== userDto.code) {
      throw new UnauthorizedException('Неверный код!');
    }

    let user = await this.userService.getUserByPhone(userDto.phone);

    if (!user) {
      user = await this.userService.createUser(userDto);
    }

    return {
      user,
      token: this.jwtService.generateToken({
        userId: user._id,
      }),
    };
  }

  async sendAuthCode({ phone }: SendAuthCodeDto): Promise<string> {
    const response = await fetch(
      `https://sms.ru/code/call?phone=${phone}}&api_id=9BF9CE23-8547-A80B-FAA7-67AB5661394E`,
      {
        method: 'POST',
      },
    ).then((res) => res.json());

    const oldCode = await this.authCodeModel.findOne({
      phone,
    });

    const code: string = response.code;

    if (oldCode) {
      await oldCode.update({
        code,
      });
    } else {
      const newCode = new this.authCodeModel({
        code,
        phone,
      });

      await newCode.save();
    }

    return code;
  }
}
