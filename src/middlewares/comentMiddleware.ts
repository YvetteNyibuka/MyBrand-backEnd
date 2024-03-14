import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  blogId?: string;
}

export const extractBlogId = (
  req: CustomRequest, 
  res: Response,
  next: NextFunction
) => {
  const blogId = req.params.blogId; 

  if (!blogId) {
    return res.status(400).json({ message: "Blog ID is missing", data: {} });
  }

  req.blogId = blogId; 

  next();
};
