"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../../controllers/auth/user.controllers");
const userMiddleware_1 = __importDefault(require("../../middlewares/auth/userMiddleware"));
const userRoutes = express_1.default.Router();
userRoutes.post('/', userMiddleware_1.default, user_controllers_1.httpCreateUser);
userRoutes.get('/', user_controllers_1.httpGetUsers);
userRoutes.get('/:id', user_controllers_1.httpGetOneUser);
userRoutes.patch('/:id', user_controllers_1.httpUpdateOneUser);
userRoutes.delete('/:id', user_controllers_1.deletesingleUser);
exports.default = userRoutes;
