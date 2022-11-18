import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateEquipmentDto,
  Equipment,
  EquipmentDocument,
} from 'equipment/equipment.model';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class EquipmentRepository {
  constructor(
    @InjectModel(Equipment.name)
    private readonly equipmentModel: Model<EquipmentDocument>,
  ) {}

  find(equipmentFilterQuery?: FilterQuery<Equipment>): Promise<Equipment[]> {
    return this.equipmentModel.find(equipmentFilterQuery).exec();
  }

  findById(id: string) {
    return this.equipmentModel.findById(id);
  }

  async create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
    const newEquipment = await this.equipmentModel.create(createEquipmentDto);
    return newEquipment.save();
  }
}
