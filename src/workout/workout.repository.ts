import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWorkoutDto, Workout } from 'workout/workout.model';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class WorkoutRepository {
  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<Workout>,
  ) {}

  findOne(workoutFindQuery: FilterQuery<Workout>): Promise<Workout> | null {
    return this.workoutModel
      .findOne(workoutFindQuery)
      .populate('exercises')
      .populate('exercises.equipment')
      .exec();
  }

  find(workoutFindQuery: FilterQuery<Workout>): Promise<Workout[]> {
    return this.workoutModel
      .find(workoutFindQuery)
      .populate({
        path: 'exercises',
        populate: 'equipment',
      })
      .exec();
  }

  async create(createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
    const newWorkout = new this.workoutModel(createWorkoutDto);

    await newWorkout.save();

    return newWorkout;
  }
}
