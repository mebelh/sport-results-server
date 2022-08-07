import { Schema } from 'mongoose';

export interface IEquipment {
  name: string;
  tags: string[];
}

export const equipmentSchema = new Schema<IEquipment>({
  name: String,
  tags: [String],
});

export class CreateEquipmentDto {
  name: string;

  tags?: string[];
}
