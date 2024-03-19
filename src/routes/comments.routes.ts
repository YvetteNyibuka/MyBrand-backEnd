import express from 'express';
import { createComment, getCommentsByBlogId} from '../controllers/comment.controllers';
import {isUser} from '../middlewares/authorization'

const commentRouter = express.Router();

commentRouter.post('/:blogId/comments', isUser,createComment);
commentRouter.get('/:blogId/comments',isUser, getCommentsByBlogId);

export default commentRouter;
