"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controllers_1 = require("../controllers/comment.controllers");
const coomentMiddleware_1 = __importDefault(require("../middlewares/coomentMiddleware"));
const commentRouter = express_1.default.Router();
commentRouter.post('/:blogId/comments', coomentMiddleware_1.default, comment_controllers_1.createComment);
commentRouter.get('/:blogId/comments', comment_controllers_1.getCommentsByBlogId);
exports.default = commentRouter;
