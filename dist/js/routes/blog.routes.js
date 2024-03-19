"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../middlewares/authorization");
const blog_controllers_1 = require("../controllers/blog.controllers");
const multer_1 = __importDefault(require("multer"));
const blogMiddleware_1 = __importDefault(require("../middlewares/blogMiddleware"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const blogRoutes = express_1.default.Router();
blogRoutes.post('/', authorization_1.isAdmin, upload.single("coverImage"), blogMiddleware_1.default, blog_controllers_1.httpCreateBlog);
blogRoutes.get('/', blog_controllers_1.httpGetBlogs);
blogRoutes.get('/:id', authorization_1.isUser, blog_controllers_1.httpGetOneBlog);
blogRoutes.patch('/:id', authorization_1.isAdmin, blog_controllers_1.httpUpdateOneBlog);
blogRoutes.delete('/:id', authorization_1.isAdmin, blog_controllers_1.deletesingleBlog);
exports.default = blogRoutes;
