import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateResultDto, Result } from 'result/result.model';
import { FilterQuery, Model, SortOrder } from 'mongoose';

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

  find(
    resultFilterQuery?: FilterQuery<Result>,
    sort?: Partial<Record<keyof Result, SortOrder>>,
  ): Promise<Result[]> | null {
    return this.resultModel
      .find(resultFilterQuery)
      .populate({
        path: 'approaches',
        populate: {
          path: 'exercise',
        },
      })
      .sort(sort)
      .populate('user')
      .exec();
  }

  async create(createResultDto: CreateResultDto) {
    const newResult = new this.resultModel({
      ...createResultDto,
      user: createResultDto.userId,
    });

    await newResult.save();

    return newResult.populate('user');
  }
}
