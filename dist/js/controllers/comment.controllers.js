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
exports.getCommentsByBlogId = exports.createComment = exports.getComments = void 0;
const commentSchema_1 = __importDefault(require("../models/commentSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Clcikeddddddddddddddddddddddddddddddddddddddddddddddddd");
    try {
        const allComments = yield commentSchema_1.default.find({});
        res.status(200).json({ message: 'Comments found', data: allComments });
    }
    catch (e) {
        console.log("Error fetching comments:", e);
    }
});
exports.getComments = getComments;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const blogId = req.params.blogId;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.MY_SECRET_KEY || "FYSHAFRW");
        const username = decodedToken.names;
        const { commentMessage } = req.body;
        const comment = new commentSchema_1.default({
            commentMessage,
            blogId,
            username,
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
