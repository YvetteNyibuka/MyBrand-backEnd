import { Request, Response } from 'express';
import Like from '../models/likeSchema';

export const likeBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.blogId;
    const { userId } = req.body;
    const { isLiked } = req.body;

    // Check if the user has already liked the blog
    const existingLike = await Like.findOne({ blogId, userId, isLiked });
    if (existingLike) {
      return res.status(400).json({ message: 'Blog already liked by this user' });
    }

    // Create a new like
    const like = new Like({userId, isLiked });
    await like.save();

    res.status(200).json({ message: 'Blog liked successfully', blogId: blogId, data: like });
  } catch (error) {
    console.error('Error liking blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getLikesByBlogId = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;

    // Find all likes for the specified blogId
    const likes = await Like.find({ blogId });
    
    res.status(200).json({ message: 'Likes found', data: likes });
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
