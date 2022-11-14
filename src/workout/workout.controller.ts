import { Controller, Get } from '@nestjs/common';

@Controller('workout')
export class WorkoutController {
  @Get('/')
  async getWorkout(): Promise<any> {}
}
