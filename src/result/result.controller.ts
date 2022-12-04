import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Approach, CreateApproachDto } from 'approach/approach.model';
import { AuthGuard } from 'auth/auth.guard';
import { CreateResultDto } from 'result/result.model';
import { ResultService } from 'result/result.service';
import { IRequest } from 'users/users.model';

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
    @Body() createResultDto: Omit<CreateResultDto, 'userId'>,
  ) {
    return await this.resultService.startWorkout({
      workoutId: createResultDto.workoutId,
      userId: req.user._id,
    });
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getResult(@Param() params, @Req() req: IRequest) {
    return await this.resultService.find({
      user: req.user._id,
    });
  }

  @Post('/addApproach')
  @UseGuards(AuthGuard)
  async addApproach(
    @Req() req: IRequest,
    @Body() createApproachDto: CreateApproachDto,
  ): Promise<Approach> {
    return await this.resultService.addApproach(createApproachDto);
  }
}
