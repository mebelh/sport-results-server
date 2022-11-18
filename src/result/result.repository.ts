import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateResultDto, Result } from 'result/result.model';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ResultRepository {
  constructor(@InjectModel(Result.name) private resultModel: Model<Result>) {}

  findOne(resultFilterQuery: FilterQuery<Result>): Promise<Result> | null {
    return this.resultModel
      .findOne(resultFilterQuery)
      .populate('exercise')
      .populate('approaches')
      .exec();
  }

  find(resultFilterQuery: FilterQuery<Result>): Promise<Result[]> | null {
    return this.resultModel
      .find(resultFilterQuery)
      .populate('exercise')
      .populate('approaches')
      .exec();
  }

  async create(createResultDto: CreateResultDto) {
    const newResult = new this.resultModel(createResultDto);

    await newResult.save();

    return newResult;
  }
}
