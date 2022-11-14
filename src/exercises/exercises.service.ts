import { Inject, Injectable } from '@nestjs/common';
import { EXERCISE_MODEL } from 'exercises/constants';
import { Model } from 'mongoose';
import { CreateExerciseDto, IExercise } from 'exercises/exercise.model';
import { EQUIPMENT_MODEL } from 'equipment/constants';
import { IEquipment } from 'equipment/equipment.model';

@Injectable()
export class ExercisesService {
  constructor(
    @Inject(EXERCISE_MODEL) private exercisesRepository: Model<IExercise>,
    @Inject(EQUIPMENT_MODEL) private equipmentRepository: Model<IEquipment>,
  ) {}

  async getAllExercises() {
    const exercises = await this.exercisesRepository.find().exec();

    const ex = exercises.map(async (exercise) => {
      return {
        name: exercise.name,
        equipment: await Promise.all(
          exercise.equipment.map((equipment) =>
            this.equipmentRepository.findById(equipment),
          ),
        ),
      };
    });

    return {
      exercises: await Promise.all(ex),
    };
  }

  async createExercise(createExerciseDto: CreateExerciseDto) {
    const exercise = await this.exercisesRepository.create(createExerciseDto);
    await exercise.save();
    return { exercise };
  }
}
