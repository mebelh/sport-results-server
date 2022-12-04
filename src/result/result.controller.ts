import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'auth/auth.guard';
import { CreateResultDto } from 'result/result.model';
import { ResultService } from 'result/result.service';
import { IRequest } from 'users/users.model';
import { CreateWorkoutDto } from 'workout/workout.model';

@Controller('result')
export class ResultController {
  constructor(private resultService: ResultService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  getResults(@Req() req: IRequest) {
    return this.resultService.find({
      user: req.user._id,
    });
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  async createResult(
    @Req() req: IRequest,
    @Body() createResultDto: CreateResultDto,
  ) {
    return await this.resultService.startWorkout({
      workoutId: createResultDto.workoutId,
      userId: req.user._id,
    });
  }
}
