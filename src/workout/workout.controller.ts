import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'auth/auth.guard';
import { IRequest } from 'users/users.model';
import { CreateWorkoutDto, Workout } from 'workout/workout.model';
import { WorkoutService } from 'workout/workout.service';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  async getWorkout(@Req() req: IRequest): Promise<Workout[]> {
    console.log(req.user);

    return this.workoutService.find({
      user: req.user._id,
    });
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  async createWorkout(
    @Body() createWorkoutDto: CreateWorkoutDto,
    @Req() req: IRequest,
  ): Promise<Workout> {
    return this.workoutService.create({
      ...createWorkoutDto,
      user: req.user._id,
    });
  }
}
