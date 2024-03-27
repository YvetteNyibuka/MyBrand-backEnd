import { Request, Response } from 'express';
import Like from '../models/likeSchema';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const likeBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.blogId;
    const token: any = req.headers.authorization?.split(" ")[1]; 
    const { isLiked } = req.body;

    if (!token) {
      return res.status(401).json({ message: 'Login first' });
    }

    const decodedToken: any = jwt.verify(token, process.env.MY_SECRET_KEY || "FYSHAFRW");
    const userId = decodedToken._id;
    const existingLike = await Like.findOne({ blogId, userId });

    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      return res.status(200).json({ message: 'Blog like removed successfully' });
    }

    const like = new Like({ userId, isLiked, blogId });
    await like.save();

    res.status(201).json({ message: 'Blog liked successfully', blogId: blogId, data: like });
  } catch (error) {
    console.error('Error liking blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getLikesByBlogId = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;

    const likes = await Like.find({ blogId });
    res.status(200).json({ message: 'Likes found', data: likes });
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
