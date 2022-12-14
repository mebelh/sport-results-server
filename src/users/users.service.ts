import { Injectable } from '@nestjs/common';
import { IUser } from 'users/users.model';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { UsersRepository } from 'users/users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

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

  async getUserByPhone(phone): Promise<IUser> {
    return this.userRepository.findOne({
      phone,
    });
  }

  createUser(userDto: CreateUserDto): Promise<IUser> {
    return this.userRepository.create(userDto);
  }
}
