import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateExerciseDto, Exercise } from 'exercises/exercise.model';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ExerciseRepository {
  constructor(
    @InjectModel(Exercise.name) private exerciseModule: Model<Exercise>,
  ) {}

  findOne(exerciseFilterQuery: FilterQuery<Exercise>) {
    return this.exerciseModule.findOne(exerciseFilterQuery);
  }

  find(exerciseFilterQuery?: FilterQuery<Exercise>) {
    return this.exerciseModule.find(exerciseFilterQuery).populate('equipment');
  }

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const newExercise = await this.exerciseModule.create(createExerciseDto);
    return await newExercise.save();
  }
}
