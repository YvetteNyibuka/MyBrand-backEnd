"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controllers_1 = require("../controllers/blog.controllers");
const blogMiddleware_1 = __importDefault(require("../middlewares/blogMiddleware"));
const blogRoutes = express_1.default.Router();
blogRoutes.post('/', blogMiddleware_1.default, blog_controllers_1.httpCreateBlog);
blogRoutes.get('/', blog_controllers_1.httpGetBlogs);
blogRoutes.get('/:id', blog_controllers_1.httpGetOneBlog);
blogRoutes.patch('/:id', blog_controllers_1.httpUpdateOneBlog);
blogRoutes.delete('/:id', blog_controllers_1.deletesingleBlog);
exports.default = blogRoutes;
