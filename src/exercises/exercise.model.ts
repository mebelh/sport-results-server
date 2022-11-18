import { Equipment } from 'equipment/equipment.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Exercise extends Document {
  @Prop({
    type: [Types.ObjectId],
    ref: Equipment.name,
  })
  equipment: Equipment[];

  @Prop({
    required: true,
  })
  name: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);

export class CreateExerciseDto {
  name: string;
  equipment: string[];
}
