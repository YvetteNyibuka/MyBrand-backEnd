"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsByBlogId = exports.createComment = void 0;
const commentSchema_1 = __importDefault(require("../models/commentSchema"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.blogId;
        const { commentMessage } = req.body;
        const comment = new commentSchema_1.default({
            commentMessage,
        });
        yield comment.save();
        res.status(201).json({ message: 'Comment created', blogId: blogId, data: comment });
    }
    catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createComment = createComment;
const getCommentsByBlogId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield commentSchema_1.default.find({ blogId: req.params.blogId });
        res.status(200).json({ message: 'Comments found', data: comments });
    }
    catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getCommentsByBlogId = getCommentsByBlogId;
