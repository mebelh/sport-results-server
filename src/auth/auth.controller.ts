import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserDto, SendAuthCodeDto } from 'users/dto/create-user.dto';
import { AuthService } from 'auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: AuthUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/sendVerifyCode')
  sendVerifyCode(@Body() sendAuthCodeDto: SendAuthCodeDto) {
    return this.authService.sendAuthCode(sendAuthCodeDto);
  }
}
