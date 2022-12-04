import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Approach } from 'approach/approach.model';
import { User } from 'users/users.model';
import { Workout } from 'workout/workout.model';

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Result extends Document {
  @Prop({
    ref: Workout.name,
    type: Types.ObjectId,
  })
  exercise: Workout;

  @Prop({
    ref: Approach.name,
    type: [Types.ObjectId],
  })
  approaches: Approach[];

  @Prop({
    ref: User.name,
    type: Types.ObjectId,
  })
  user: User;

  @Prop({
    type: String,
    default: new Date().toISOString(),
  })
  date: string;
}

export const ResultSchema = SchemaFactory.createForClass(Result);

export class CreateResultDto {
  workoutId: string;
  userId: string;
}
