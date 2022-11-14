import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateExerciseDto } from 'exercises/exercise.model';
import { ExercisesService } from 'exercises/exercises.service';

@Controller('exercises')
export class ExercisesController {
  constructor(private exercisesService: ExercisesService) {}

  @Get('/')
  getAllExercises() {
    return this.exercisesService.getAllExercises();
  }

  @Post('/create')
  createExercise(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.createExercise(createExerciseDto);
  }
}
