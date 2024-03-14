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
// create a blog
const httpCreateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const imageFile = req.file;
        if (!imageFile) {
            res.status(400).json({
                status: "failed",
                message: "Please provide an image file",
            });
            return;
        }
        const result = cloudinary_1.v2.uploader.upload_stream({ folder: "myPortfolio" }, (error, cloudinaryResult) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.error(error);
                res.status(500).json({
                    status: false,
                    message: "An error occurred while uploading the image to Cloudinary",
                });
            }
            else {
                const blog = new blogSchema_1.default({
                    title: title,
                    description: description,
                    coverImage: cloudinaryResult.secure_url,
                });
                yield blog.save();
                res.status(201).json({ message: "Blog created", data: blog });
            }
        }));
        if (!result) {
            throw new Error("Cloudinary upload failed");
        }
        streamifier_1.default.createReadStream(imageFile.buffer).pipe(result);
    }
    catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.httpCreateBlog = httpCreateBlog;
// get all blogs
const httpGetBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blogSchema_1.default.find({});
        res.status(200).json({ message: "All blogs", data: blogs });
    }
    catch (error) {
        console.error("Error fetching blogs:", error);
        res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
});
exports.httpGetBlogs = httpGetBlogs;
const httpGetOneBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleBlog = yield blogSchema_1.default.findOne({ _id: req.params.id });
        if (!singleBlog) {
            return res.status(404).json({ message: "Blog not found", data: {} });
        }
        res.status(200).json({ message: "Blog found", data: singleBlog });
    }
    catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.httpGetOneBlog = httpGetOneBlog;
// update single blogs
const httpUpdateOneBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id.trim();
        const blog = yield blogSchema_1.default.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found", data: null });
        }
        if (req.body.title) {
            blog.title = req.body.title;
        }
        if (req.body.description) {
            blog.description = req.body.description;
        }
        yield blog.save();
        res.status(200).json({ message: "Blog updated successfully", data: blog });
    }
    catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.httpUpdateOneBlog = httpUpdateOneBlog;
// delete blog
const deletesingleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield blogSchema_1.default.deleteOne({ _id: req.params.id });
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deletesingleBlog = deletesingleBlog;
