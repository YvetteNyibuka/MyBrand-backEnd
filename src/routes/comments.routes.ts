import express from 'express';
import { createComment, getCommentsByBlogId, getComments } from '../controllers/comment.controllers';

const commentRouter = express.Router();

commentRouter.post('/:blogId/comments', createComment);
commentRouter.get('/:blogId/comments', getCommentsByBlogId);
commentRouter.get('/comments', getComments);

export default commentRouter;
