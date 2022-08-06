import { Schema } from 'mongoose';

export interface IEquipment {
  name: string;
  tags: string[];
}

const equipmentSchema = new Schema({});
