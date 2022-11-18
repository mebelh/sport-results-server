import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { AuthModule } from 'auth/auth.module';
import { EquipmentRepository } from 'equipment/equipment.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Equipment, EquipmentSchema } from 'equipment/equipment.model';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Equipment.name,
        schema: EquipmentSchema,
      },
    ]),
  ],
  providers: [EquipmentRepository, EquipmentService],
  controllers: [EquipmentController],
  exports: [EquipmentService],
})
export class EquipmentModule {}
