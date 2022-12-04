import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Approach, CreateApproachDto } from 'approach/approach.model';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ApproachRepository {
  constructor(
    @InjectModel(Approach.name) private approachModel: Model<Approach>,
  ) {}

  async create(createApproachDto: CreateApproachDto) {
    const newApproach = new this.approachModel(createApproachDto);

    await newApproach.save();

    return newApproach.populate('exercise');
  }

  find(approachFilterQuery: FilterQuery<Approach>) {
    return this.approachModel
      .find(approachFilterQuery)
      .populate('workout')
      .exec();
  }
}
