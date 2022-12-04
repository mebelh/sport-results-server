import { Injectable } from '@nestjs/common';
import { ApproachService } from 'approach/approach.service';
import { FilterQuery } from 'mongoose';
import { ResultRepository } from 'result/result.repository';
import { CreateResultDto, Result } from 'result/result.model';
import { CreateApproachDto } from 'approach/approach.model';

@Injectable()
export class ResultService {
  constructor(
    private resultRepository: ResultRepository,
    private approachService: ApproachService,
  ) {}

  startWorkout(createResultDto: CreateResultDto): Promise<Result> {
    return this.resultRepository.create(createResultDto);
  }

  async addApproach(resultId: string, createApproachDto: CreateApproachDto) {
    const newApproach = await this.approachService.create(createApproachDto);

    const result = await this.resultRepository.findOne({
      id: resultId,
    });

    result.approaches.push(newApproach);

    await result.save();

    return result;
  }

  async find(resultsFilterQuery?: FilterQuery<Result>): Promise<Result[]> {
    return this.resultRepository.find(resultsFilterQuery);
  }
}
