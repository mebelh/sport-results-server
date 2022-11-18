import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Exercise } from 'exercises/exercise.model';
import { User } from 'users/users.model';

@Schema()
export class Workout {
  @Prop()
  description: string;

  @Prop({
    ref: Exercise.name,
    type: [Types.ObjectId],
  })
  exercises: Exercise[];

  @Prop({
    ref: User.name,
    type: Types.ObjectId,
  })
  user: User;

  @Prop({
    isRequired: true,
  })
  name: string;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);

export class CreateWorkoutDto {
  name: string;
  description: string;
  exercises: string[];
  user: string;
}
