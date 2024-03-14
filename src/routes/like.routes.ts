import express from 'express';
import { likeBlog, getLikesByBlogId } from '../controllers/likecontrollers';

const blogRouter = express.Router();

blogRouter.post('/:blogId/likes', likeBlog);
blogRouter.get('/:blogId/likes', getLikesByBlogId);

export default blogRouter;
