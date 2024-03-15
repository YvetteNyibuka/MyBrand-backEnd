"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_controllers_1 = require("../../controllers/auth/login.controllers");
const userRoutes = express_1.default.Router();
userRoutes.post('/', login_controllers_1.httpLogin);
exports.default = userRoutes;
