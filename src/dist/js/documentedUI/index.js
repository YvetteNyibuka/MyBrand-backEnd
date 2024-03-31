"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basicInfo_1 = __importDefault(require("./basicInfo"));
const server_1 = __importDefault(require("./server"));
const tags_1 = __importDefault(require("./tags"));
const components_1 = __importDefault(require("./components"));
const Users_1 = __importDefault(require("./Users"));
exports.default = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, basicInfo_1.default), server_1.default), tags_1.default), components_1.default), Users_1.default);
