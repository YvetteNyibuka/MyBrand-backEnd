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
exports.isUser = exports.isAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const headerValues = req.headers.authorization;
    if (!headerValues) {
        return res.status(403).json({ message: "access denied" });
    }
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.MY_SECRET_KEY || "FYSHAFRW");
        if (decodedToken.role !== 'admin' || !decodedToken)
            return res.status(403).json({ message: "access denied" });
        next();
    }
    catch (err) {
        res.status(400).json({ status: 'fail', message: "Invalid token" });
    }
});
exports.isAdmin = isAdmin;
const isUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const headerValues = req.headers.authorization;
    if (!headerValues) {
        return res.status(403).json({ message: "access denied" });
    }
    const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.MY_SECRET_KEY || "FYSHAFRW");
        if (!decodedToken.role)
            return res.status(403).json({ message: "you are not logged in" });
        next();
    }
    catch (err) {
        res.status(400).json({ status: 'fail', message: "Invalid token" });
    }
});
exports.isUser = isUser;
