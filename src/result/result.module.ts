import { Module } from '@nestjs/common';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';
import { ApproachService } from 'approach/approach.service';
import { ApproachModule } from 'approach/approach.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Result, ResultSchema } from 'result/result.model';
import { ResultRepository } from 'result/result.repository';

@Module({
  controllers: [ResultController],
  providers: [ResultRepository, ResultService, ApproachService],
  imports: [
    ApproachModule,
    MongooseModule.forFeature([
      {
        name: Result.name,
        schema: ResultSchema,
      },
    ]),
  ],
})
export class ResultModule {}
