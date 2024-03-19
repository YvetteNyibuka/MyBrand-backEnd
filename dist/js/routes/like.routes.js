"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likecontrollers_1 = require("../controllers/likecontrollers");
const authorization_1 = require("../middlewares/authorization");
const blogRouter = express_1.default.Router();
blogRouter.post('/:blogId/likes', authorization_1.isUser, likecontrollers_1.likeBlog);
blogRouter.get('/:blogId/likes', likecontrollers_1.getLikesByBlogId);
exports.default = blogRouter;
