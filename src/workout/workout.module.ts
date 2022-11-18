import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Workout, WorkoutSchema } from 'workout/workout.model';
import { WorkoutRepository } from 'workout/workout.repository';

@Module({
  providers: [WorkoutService, WorkoutRepository],
  imports: [
    MongooseModule.forFeature([
      {
        schema: WorkoutSchema,
        name: Workout.name,
      },
    ]),
  ],
  exports: [WorkoutService],
})
export class WorkoutModule {}
