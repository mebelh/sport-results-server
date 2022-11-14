import { Schema } from 'mongoose';

export interface IEquipment extends CreateEquipmentDto {
  id: string;
}

export const equipmentSchema = new Schema<CreateEquipmentDto>({
  name: String,
  tags: [String],
});

equipmentSchema.set('toJSON', {
  virtuals: true,
});

export class CreateEquipmentDto {
  name: string;

  tags?: string[];
}
