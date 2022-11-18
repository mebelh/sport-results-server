import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IEquipment extends CreateEquipmentDto {
  id: string;
}

export type EquipmentDocument = Equipment & Document;

@Schema()
export class Equipment extends Document {
  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: [String],
    default: [],
  })
  tags: string[];
}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);

EquipmentSchema.set('toJSON', {
  virtuals: true,
});

export class CreateEquipmentDto {
  name: string;

  tags?: string[];
}
