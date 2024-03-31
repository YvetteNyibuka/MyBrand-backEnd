"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const blogSchema = joi_1.default.object({
    category: joi_1.default.string().required(),
    author: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    coverImage: joi_1.default.string()
});
const validateBlog = (blogData) => {
    return blogSchema.validate(blogData);
};
exports.default = validateBlog;
