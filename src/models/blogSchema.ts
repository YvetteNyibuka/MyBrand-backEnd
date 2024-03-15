import { any } from 'joi';
import mongoose, { Schema } from 'mongoose';
import { Types } from 'mongoose';

export interface Blog extends Document {
  toObject():any
  title: string;
  description: string;
  comments: any;
  likes: any;
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
    comments:Types.ObjectId,
    likes: Types.ObjectId
  },
  { timestamps: true }
);

export default mongoose.model<Blog>('Blog', BlogSchema);
