import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Exercise } from 'exercises/exercise.model';

@Schema()
export class Approach extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: Exercise.name,
  })
  exercise: Exercise;

  @Prop(Number)
  weight: number;

  @Prop(Number)
  repetitionsNumber: number;
}

export const ApproachSchema = SchemaFactory.createForClass(Approach);

export class CreateApproachDto {}
