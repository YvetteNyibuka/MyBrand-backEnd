import express from 'express';
import { createComment, getCommentsByBlogId} from '../controllers/comment.controllers';
import {isUser} from '../middlewares/authorization'
import isValid from "../middlewares/coomentMiddleware";


const commentRouter = express.Router();

commentRouter.post('/:blogId/comments', isValid, isUser, createComment);
commentRouter.get('/:blogId/comments',isUser, getCommentsByBlogId);

export default commentRouter;
