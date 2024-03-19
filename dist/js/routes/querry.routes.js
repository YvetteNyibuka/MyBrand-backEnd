"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../middlewares/authorization");
const querry_controllers_1 = require("../controllers/querry.controllers");
const querryMiddleware_1 = __importDefault(require("../middlewares/querryMiddleware"));
const querryRoutes = express_1.default.Router();
querryRoutes.post('/', querryMiddleware_1.default, querry_controllers_1.httpCreateQuerry);
querryRoutes.get('/', authorization_1.isAdmin, querry_controllers_1.httpGetQuerries);
querryRoutes.get('/:id', querry_controllers_1.httpGetOneQuerry);
querryRoutes.delete('/:id', authorization_1.isAdmin, querry_controllers_1.deletesingleQuerry);
exports.default = querryRoutes;
