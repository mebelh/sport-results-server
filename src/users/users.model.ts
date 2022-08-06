import mongoose, { Schema } from 'mongoose';
import { IEquipment } from 'equipment/equipment.model';

export interface IUser {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  exercises: {
    date: Date;
    equipment: IEquipment[];
  };
}

export const userSchema = new Schema<IUser>({
  firstName: String,
  lastName: String,
  login: String,
  password: String,
  exercises: [
    {
      date: {
        type: Date,
        default: new Date(),
      },
      equipment: {
        type: [mongoose.Types.ObjectId],
        ref: 'equipment',
      },
    },
  ],
});
