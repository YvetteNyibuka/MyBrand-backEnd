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
exports.getLikesByBlogId = exports.likeBlog = void 0;
const likeSchema_1 = __importDefault(require("../models/likeSchema"));
const likeBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.blogId;
        const { userId } = req.body;
        const { isLiked } = req.body;
        // Check if the user has already liked the blog
        const existingLike = yield likeSchema_1.default.findOne({ blogId, userId, isLiked });
        if (existingLike) {
            return res.status(400).json({ message: 'Blog already liked by this user' });
        }
        // Create a new like
        const like = new likeSchema_1.default({ userId, isLiked });
        yield like.save();
        res.status(200).json({ message: 'Blog liked successfully', blogId: blogId, data: like });
    }
    catch (error) {
        console.error('Error liking blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.likeBlog = likeBlog;
const getLikesByBlogId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId } = req.params;
        // Find all likes for the specified blogId
        const likes = yield likeSchema_1.default.find({ blogId });
        res.status(200).json({ message: 'Likes found', data: likes });
    }
    catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getLikesByBlogId = getLikesByBlogId;
