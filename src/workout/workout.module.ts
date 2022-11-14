import { Module, ModuleMetadata } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from 'database/constants';
import { WORKOUT_MODEL } from 'workout/constants';
import { workoutSchema } from 'workout/workout.model';
import { DatabaseModule } from 'database/database.module';

export const workoutProviders: ModuleMetadata['providers'] = [
  {
    provide: WORKOUT_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Workout', workoutSchema),
    inject: [DATABASE_CONNECTION],
  },
];

@Module({
  providers: [WorkoutService, ...workoutProviders],
  imports: [DatabaseModule],
  exports: [...workoutProviders],
})
export class WorkoutModule {}
