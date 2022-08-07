import { Module, ModuleMetadata } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from 'database/constants';
import { EQUIPMENT_MODEL } from 'equipment/constants';
import { equipmentSchema } from './equipment.model';
import { DatabaseModule } from 'database/database.module';
import { AuthModule } from 'auth/auth.module';

export const equipmentProviders: ModuleMetadata['providers'] = [
  {
    provide: EQUIPMENT_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Equipment', equipmentSchema),
    inject: [DATABASE_CONNECTION],
  },
];

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [EquipmentService, ...equipmentProviders],
  controllers: [EquipmentController],
  exports: [...equipmentProviders],
})
export class EquipmentModule {}
