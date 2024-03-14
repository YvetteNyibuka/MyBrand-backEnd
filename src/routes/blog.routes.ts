import express, { Router } from 'express';
import {
  httpCreateBlog,
  httpGetBlogs,
  httpGetOneBlog,
  httpUpdateOneBlog,
  deletesingleBlog,
} from "../controllers/blog.controllers";

import multer from "multer";
import isValid from "../middlewares/blogMiddleware";


const storage = multer.memoryStorage();

const upload = multer({ storage });



const blogRoutes: Router = express.Router();

blogRoutes.post('/', upload.single("coverImage"),isValid, httpCreateBlog);
blogRoutes.get('/', httpGetBlogs);
blogRoutes.get('/:id', httpGetOneBlog);
blogRoutes.patch('/:id', httpUpdateOneBlog);
blogRoutes.delete('/:id', deletesingleBlog);

export default blogRoutes;
