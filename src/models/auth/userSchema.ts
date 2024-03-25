import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  names: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new mongoose.Schema(
  {
    names: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default:'user',
    }
  },
  { timestamps: true }
);

export default mongoose.model<User>('Users', UserSchema);
