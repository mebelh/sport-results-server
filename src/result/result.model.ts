import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Approach } from 'approach/approach.model';
import { Workout } from 'workout/workout.model';

@Schema()
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
}

export const ResultSchema = SchemaFactory.createForClass(Result);

export class CreateResultDto {
  workoutId: string;
}
