import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  _id: string;
}

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class User extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  login: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface IRequest {
  user: IUser;
}
