import express from 'express';
import { createComment, getCommentsByBlogId } from '../controllers/comment.controllers';

const commentRouter = express.Router();

commentRouter.post('/:blogId/comments', createComment);
commentRouter.get('/:blogId/comments', getCommentsByBlogId);

export default commentRouter;
