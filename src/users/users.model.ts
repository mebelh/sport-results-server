import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  _id: string;
  phone: string;
}

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class User extends Document {
  @Prop(String)
  firstName: string;

  @Prop(String)
  lastName: string;

  @Prop(String)
  login: string;

  @Prop(String)
  password: string;

  @Prop(String)
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface IRequest {
  user: IUser;
}
