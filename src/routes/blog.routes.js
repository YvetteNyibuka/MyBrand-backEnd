const express = require('express');
const httpBlog = require('../controllers/blog.controllers.js');
const isValid = require('../middlewares/blogMiddleware.js');

const blogRoutes = express.Router();

blogRoutes.post('/', isValid, httpBlog.httpCreateBlog);
blogRoutes.get('/', httpBlog.httpGetBlogs);
blogRoutes.get('/:id', httpBlog.httpGetOneBlog )
blogRoutes.patch('/:id', httpBlog.httpUpdateOneBlog )
blogRoutes.delete('/:id', httpBlog.deletesingleBlog )

module.exports = blogRoutes;