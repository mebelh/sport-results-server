import { Injectable } from '@nestjs/common';
import { WorkoutRepository } from 'workout/workout.repository';
import { CreateWorkoutDto, Workout } from 'workout/workout.model';
import { FilterQuery } from 'mongoose';

@Injectable()
export class WorkoutService {
  constructor(private workoutRepository: WorkoutRepository) {}

  create(createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
    return this.workoutRepository.create(createWorkoutDto);
  }

  find(workoutFilterQuery?: FilterQuery<Workout>): Promise<Workout[]> {
    return this.workoutRepository.find(workoutFilterQuery);
  }
}
