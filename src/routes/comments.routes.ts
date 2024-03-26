import express from 'express';
import { createComment, getCommentsByBlogId} from '../controllers/comment.controllers';
import {isAdmin, isUser} from '../middlewares/authorization'
import isValid from "../middlewares/coomentMiddleware";


const commentRouter = express.Router();

commentRouter.post('/:blogId/comments', isValid, isAdmin, createComment);
commentRouter.get('/:blogId/comments',isAdmin, getCommentsByBlogId);

export default commentRouter;
