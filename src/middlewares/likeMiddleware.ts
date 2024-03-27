import { Request, Response, NextFunction, RequestHandler } from 'express';
import Like from '../models/likeSchema';

export const checkIfLiked: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { blogId } = req.params;
    const { userId } = req.body;

    // Check if the user has already liked the blog
    const existingLike = await Like.findOne({ blogId, userId });
    if (existingLike) {
      return res.status(400).json({ message: 'Blog already liked by this user' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
