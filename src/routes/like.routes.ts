import express from 'express';
import { likeBlog, getLikesByBlogId } from '../controllers/likecontrollers';
import {isUser} from '../middlewares/authorization'

const blogRouter = express.Router();

blogRouter.post('/:blogId/likes', isUser, likeBlog);
blogRouter.get('/:blogId/likes', getLikesByBlogId);

export default blogRouter;
