import { Request, Response } from 'express';
import Comment from '../models/commentSchema';
import jwt from 'jsonwebtoken';

export const createComment = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.blogId;
    const token:any = req.headers.authorization?.split(" ")[1]; 
    const decodedToken: any = jwt.verify(token,   process.env.MY_SECRET_KEY || "FYSHAFRW" );
    const username = decodedToken.names;
    const {commentMessage } = req.body;
    const comment = new Comment({
      commentMessage,
      blogId,
      username,
    });
    await comment.save();
    res.status(201).json({ message: 'Comment created', blogId: blogId, data: comment});
  } catch (error) {
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


