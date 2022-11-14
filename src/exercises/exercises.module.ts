import { Module, ModuleMetadata } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { EXERCISE_MODEL } from './constants';
import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from 'database/constants';
import { exerciseSchema } from 'exercises/exercise.model';
import { DatabaseModule } from 'database/database.module';
import { EQUIPMENT_MODEL } from 'equipment/constants';
import { equipmentSchema } from 'equipment/equipment.model';

export const exercisesProviders: ModuleMetadata['providers'] = [
  {
    provide: EXERCISE_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Exercise', exerciseSchema),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: EQUIPMENT_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Equipment', equipmentSchema),
    inject: [DATABASE_CONNECTION],
  },
];

@Module({
  imports: [DatabaseModule],
  controllers: [ExercisesController],
  providers: [ExercisesService, ...exercisesProviders],
  exports: [...exercisesProviders],
})
export class ExercisesModule {}
