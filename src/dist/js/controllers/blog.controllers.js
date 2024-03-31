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
exports.deletesingleBlog = exports.httpUpdateOneBlog = exports.httpGetOneBlog = exports.httpGetBlogs = exports.httpCreateBlog = void 0;
const blogSchema_1 = __importDefault(require("../models/blogSchema"));
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const commentSchema_1 = __importDefault(require("../models/commentSchema"));
const likeSchema_1 = __importDefault(require("../models/likeSchema"));
const httpCreateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, category, author } = req.body;
        const imageFile = req.file;
        if (!imageFile) {
            res.status(400).json({
                status: "failed",
                message: "Please provide an image file",
            });
            return;
        }
        const result = cloudinary_1.v2.uploader.upload_stream({ folder: "myPortfolio" }, (error, cloudinaryResult) => __awaiter(void 0, void 0, void 0, function* () {
            const blog = new blogSchema_1.default({
                category: category,
                author: author,
                title: title,
                description: description,
                coverImage: cloudinaryResult.secure_url,
            });
            yield blog.save();
            res.status(201).json({ message: "Blog created successfuly", data: blog });
        }));
        streamifier_1.default.createReadStream(imageFile.buffer).pipe(result);
    }
    catch (error) {
        res.status(500).json({ message: "internal server error", error });
    }
});
exports.httpCreateBlog = httpCreateBlog;
const httpGetBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blogSchema_1.default.find({});
        if (blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found", data: null });
        }
        const blogsWithComments = yield Promise.all(blogs.map((blog) => __awaiter(void 0, void 0, void 0, function* () {
            const comments = yield commentSchema_1.default.find({ blogId: blog._id });
            const likes = yield likeSchema_1.default.find({ blogId: blog._id });
            return Object.assign(Object.assign({}, blog.toObject()), { comments: comments, likes: likes.length });
        })));
        ``;
        return res.status(200).json({ message: "Blogs with comments", data: blogsWithComments });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
exports.httpGetBlogs = httpGetBlogs;
const httpGetOneBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleBlog = yield blogSchema_1.default.findOne({ _id: req.params.id });
        if (!singleBlog) {
            return res.status(404).json({ message: "Blog not found", data: {} });
        }
        const singleBlogComments = yield commentSchema_1.default.find({ blogId: singleBlog._id });
        const singleBloglikes = yield likeSchema_1.default.find({ blogId: singleBlog._id });
        res.status(200).json({ message: "Blog found", data: { singleBlog, singleBlogComments, singleBloglikes } });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.httpGetOneBlog = httpGetOneBlog;
const httpUpdateOneBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id.trim();
        const blog = yield blogSchema_1.default.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found", data: null });
        }
        yield blog.save();
        res.status(201).json({ message: "Blog updated successfully", data: blog });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.httpUpdateOneBlog = httpUpdateOneBlog;
const deletesingleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBlog = yield blogSchema_1.default.deleteOne({ _id: req.params.id });
        if (deletedBlog.deletedCount === 0) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(204).json({ message: "Blog deleted successfully" });
        ;
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deletesingleBlog = deletesingleBlog;
