"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getUsers_1 = __importDefault(require("./getUsers"));
const registerUser_1 = __importDefault(require("./registerUser"));
const login_1 = __importDefault(require("./login"));
const gettUserById_1 = __importDefault(require("./gettUserById"));
const deleteUser_1 = __importDefault(require("./deleteUser"));
const updateUser_1 = __importDefault(require("./updateUser"));
const getBlogs_1 = __importDefault(require("../Blogs/getBlogs"));
const createBlog_1 = __importDefault(require("../Blogs/createBlog"));
const getOneBlogById_1 = __importDefault(require("../Blogs/getOneBlogById"));
const deleteBlog_1 = __importDefault(require("../Blogs/deleteBlog"));
const addComment_1 = __importDefault(require("../Comments/addComment"));
const getCommentsByBlogId_1 = __importDefault(require("../Comments/getCommentsByBlogId"));
const addLike_1 = __importDefault(require("../Like/addLike"));
const createQuerry_1 = __importDefault(require("../Querries/createQuerry"));
const getQuerries_1 = __importDefault(require("../Querries/getQuerries"));
const getOneQuery_1 = __importDefault(require("../Querries/getOneQuery"));
const deleteQuerry_1 = __importDefault(require("../Querries/deleteQuerry"));
exports.default = {
    paths: {
        '/api/v1/users': Object.assign({}, getUsers_1.default),
        '/api/v1/users/{id}': Object.assign(Object.assign(Object.assign({}, gettUserById_1.default), deleteUser_1.default), updateUser_1.default),
        '/api/v1/users/register': Object.assign({}, registerUser_1.default),
        '/api/v1/users/login': Object.assign({}, login_1.default),
        '/api/v1/blogs': Object.assign(Object.assign({}, getBlogs_1.default), createBlog_1.default),
        '/api/v1/blogs/{id}': Object.assign(Object.assign({}, getOneBlogById_1.default), deleteBlog_1.default),
        '/api/v1/blogs/{id}/comments': Object.assign(Object.assign({}, addComment_1.default), getCommentsByBlogId_1.default),
        '/api/v1/blogs/{id}/likes': Object.assign({}, addLike_1.default),
        '/api/v1/querries': Object.assign(Object.assign({}, createQuerry_1.default), getQuerries_1.default),
        '/api/v1/querries/{id}': Object.assign(Object.assign({}, getOneQuery_1.default), deleteQuerry_1.default)
    },
};
