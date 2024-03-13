import express, { Router } from 'express';
import {
  httpCreateBlog,
  httpGetBlogs,
  httpGetOneBlog,
  httpUpdateOneBlog,
  deletesingleBlog,
} from "../controllers/blog.controllers";

import isValid from "../middlewares/blogMiddleware";

const blogRoutes: Router = express.Router();

blogRoutes.post('/', isValid, httpCreateBlog);
blogRoutes.get('/', httpGetBlogs);
blogRoutes.get('/:id', httpGetOneBlog);
blogRoutes.patch('/:id', httpUpdateOneBlog);
blogRoutes.delete('/:id', deletesingleBlog);

export default blogRoutes;
