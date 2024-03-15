"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_routes_1 = __importDefault(require("./blog.routes"));
const comments_routes_1 = __importDefault(require("./comments.routes"));
const like_routes_1 = __importDefault(require("./like.routes"));
const querry_routes_1 = __importDefault(require("./querry.routes"));
const signup_routes_1 = __importDefault(require("../routes/auth/signup.routes"));
const apiRouter = express_1.default.Router();
apiRouter.use('/blog', blog_routes_1.default);
apiRouter.use('/blog', comments_routes_1.default);
apiRouter.use('/blog', like_routes_1.default);
apiRouter.use('/querries', querry_routes_1.default);
apiRouter.use('/auth/register', signup_routes_1.default);
exports.default = apiRouter;
