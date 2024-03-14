import express from 'express';
import { createComment, getCommentsByBlogId } from '../controllers/comment.controllers';
import isValid from '../middlewares/coomentMiddleware';

const commentRouter = express.Router();

commentRouter.post('/:blogId/comments',isValid, createComment);
commentRouter.get('/:blogId/comments', getCommentsByBlogId);

export default commentRouter;
