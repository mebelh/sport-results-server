import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AuthCode extends Document {
  @Prop(String)
  code: string;

  @Prop(String)
  phone: string;
}

export const AuthCodeSchema = SchemaFactory.createForClass(AuthCode);
