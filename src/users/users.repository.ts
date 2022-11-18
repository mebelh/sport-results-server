import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser, User, UserDocument } from 'users/users.model';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserDto } from 'users/dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(userFilterQuery: FilterQuery<User>): Promise<IUser> {
    return this.userModel.findOne(userFilterQuery).exec();
  }

  async find(userFilterQuery: FilterQuery<User>): Promise<IUser[]> {
    return this.userModel.find(userFilterQuery).exec();
  }

  async create(user: CreateUserDto): Promise<IUser> {
    const newUser = await this.userModel.create(user);

    return newUser.save();
  }

  async update(
    userFilterQuery: FilterQuery<User>,
    user: Partial<User>,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate(userFilterQuery, user);
  }
}
