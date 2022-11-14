import mongoose, { Schema } from 'mongoose';
import { IEquipment } from 'equipment/equipment.model';

export interface IExercise extends Omit<CreateExerciseDto, 'equipment'> {
  equipment: IEquipment[];
}

export const exerciseSchema = new Schema<CreateExerciseDto>({
  equipment: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Equipment',
    },
  ],
  name: String,
});

exerciseSchema.set('toJSON', {
  virtuals: true,
});

export class CreateExerciseDto {
  name: string;
  equipment: string[];
}
