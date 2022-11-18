import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto, Equipment } from 'equipment/equipment.model';
import { EquipmentRepository } from 'equipment/equipment.repository';

@Injectable()
export class EquipmentService {
  constructor(private equipmentRepository: EquipmentRepository) {}

  async create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
    return this.equipmentRepository.create(createEquipmentDto);
  }

  getAllEquipment(): Promise<Equipment[]> {
    return this.equipmentRepository.find();
  }

  findById(id: string): Promise<Equipment> {
    return this.equipmentRepository.findById(id).exec();
  }
}
