import { Body, Controller, Get, Post } from '@nestjs/common';
import { EquipmentService } from 'equipment/equipment.service';
import { CreateEquipmentDto } from 'equipment/equipment.model';

@Controller('equipment')
export class EquipmentController {
  constructor(private equipmentService: EquipmentService) {}

  @Get('/')
  getAllEquipment() {
    return this.equipmentService.getAllEquipment();
  }

  @Post('/create')
  createEquipment(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
  }
}
