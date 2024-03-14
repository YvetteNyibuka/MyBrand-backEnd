import mongoose, { Schema, Document } from 'mongoose';

export interface Querry extends Document {
  fullNames: string;
  email: string;
  subject: string;
  message: string;
}

const QuerrySchema: Schema = new mongoose.Schema(
  {
    fullNames: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Querry>('Querries', QuerrySchema);
