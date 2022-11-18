import { Injectable } from '@nestjs/common';
import { ApproachRepository } from 'approach/approach.repository';
import { Approach, CreateApproachDto } from 'approach/approach.model';
import { FilterQuery } from 'mongoose';

@Injectable()
export class ApproachService {
  constructor(private approachRepository: ApproachRepository) {}

  create(createApproachDto: CreateApproachDto): Promise<Approach> {
    return this.approachRepository.create(createApproachDto);
  }

  find(approachFindQuery: FilterQuery<Approach>): Promise<Approach[]> {
    return this.approachRepository.find(approachFindQuery);
  }
}
