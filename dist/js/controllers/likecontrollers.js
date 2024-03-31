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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const likeBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const blogId = req.params.blogId;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const { isLiked } = req.body;
        if (!token) {
            return res.status(401).json({ message: 'Login first' });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.MY_SECRET_KEY || "FYSHAFRW");
        const userId = decodedToken._id;
        const existingLike = yield likeSchema_1.default.findOne({ blogId, userId });
        if (existingLike) {
            yield likeSchema_1.default.deleteOne({ _id: existingLike._id });
            return res.status(200).json({ message: 'Blog like removed successfully' });
        }
        const like = new likeSchema_1.default({ userId, isLiked, blogId });
        yield like.save();
        res.status(201).json({ message: 'Blog liked successfully', blogId: blogId, data: like });
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
        const likes = yield likeSchema_1.default.find({ blogId });
        res.status(200).json({ message: 'Likes found', data: likes });
    }
    catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getLikesByBlogId = getLikesByBlogId;
