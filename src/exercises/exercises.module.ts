import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExerciseRepository } from 'exercises/exercise.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from 'exercises/exercise.model';
import { ExercisesService } from 'exercises/exercises.service';
import { EquipmentModule } from 'equipment/equipment.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Exercise.name,
        schema: ExerciseSchema,
      },
    ]),
    EquipmentModule,
  ],
  controllers: [ExercisesController],
  providers: [ExerciseRepository, ExercisesService],
  exports: [ExercisesService],
})
export class ExercisesModule {}
