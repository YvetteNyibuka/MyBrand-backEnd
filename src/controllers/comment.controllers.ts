import { Request, Response } from 'express';
import Comment from '../models/commentSchema';

export const createComment = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.blogId;
    const {commentMessage } = req.body;
    const comment = new Comment({
      commentMessage,
    });

    await comment.save();
    res.status(201).json({ message: 'Comment created', blogId: blogId, data: comment});
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCommentsByBlogId = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId });
    res.status(200).json({ message: 'Comments found', data: comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
