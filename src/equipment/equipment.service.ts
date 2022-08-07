import { Inject, Injectable } from '@nestjs/common';
import { CreateEquipmentDto, IEquipment } from 'equipment/equipment.model';
import { EQUIPMENT_MODEL } from 'equipment/constants';
import { Model } from 'mongoose';

@Injectable()
export class EquipmentService {
  constructor(
    @Inject(EQUIPMENT_MODEL) private equipmentRepository: Model<IEquipment>,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto): Promise<IEquipment> {
    const equipment = new this.equipmentRepository(createEquipmentDto);
    await equipment.save();
    return equipment;
  }

  getAllEquipment(): Promise<IEquipment[]> {
    return this.equipmentRepository.find().exec();
  }
}
