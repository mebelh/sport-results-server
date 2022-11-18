import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from 'exercises/exercise.model';
import { ExerciseRepository } from 'exercises/exercise.repository';
import { EquipmentService } from 'equipment/equipment.service';

@Injectable()
export class ExercisesService {
  constructor(
    private equipmentService: EquipmentService,
    private exercisesRepository: ExerciseRepository,
  ) {}

  async getAllExercises() {
    const exercises = await this.exercisesRepository.find();

    return {
      exercises,
    };
  }

  async createExercise(createExerciseDto: CreateExerciseDto) {
    const exercise = await this.exercisesRepository.create(createExerciseDto);
    return { exercise };
  }
}
