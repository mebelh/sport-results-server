import { Inject, Injectable } from '@nestjs/common';
import { IUser } from 'users/users.model';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { USER_MODEL } from 'users/constants';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_MODEL) private userRepository: Model<IUser>) {}

  async getUserByEmail(email: string): Promise<IUser> {
    return this.userRepository.findOne({
      email,
    });
  }

  async getUserByLogin(login: string): Promise<IUser> {
    return this.userRepository.findOne({
      login,
    });
  }

  async createUser(userDto: CreateUserDto): Promise<IUser> {
    const user = await this.userRepository.create(userDto);
    await user.save();
    return user;
  }
}
