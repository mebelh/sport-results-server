import { Schema } from 'mongoose';

export const workoutSchema = new Schema<CreateWorkoutSchema>({
  description: {
    type: String,
    required: false,
  },
  exercises: [
    {
      ref: 'Exercise',
      type: Schema.Types.ObjectId,
    },
  ],
  name: {
    type: String,
    required: true,
  },
});

workoutSchema.set('toJSON', {
  virtuals: true,
});

export interface CreateWorkoutSchema {
  name: string;
  description: string;
  exercises: string[];
}
