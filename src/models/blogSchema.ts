import mongoose, { Schema, Document } from 'mongoose';

export interface Blog extends Document {
  title: string;
  description: string;
}

const BlogSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Blog>('Blog', BlogSchema);
