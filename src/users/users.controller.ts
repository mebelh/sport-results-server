import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { AuthGuard } from 'auth/auth.guard';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  getUser(@Req() req) {
    return {
      user: req.user,
    };
  }
}
