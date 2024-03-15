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
exports.httpLogin = void 0;
const userSchema_1 = __importDefault(require("../../models/auth/userSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const httpLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const { email, password } = user;
        const isUserExist = yield userSchema_1.default.findOne({
            email: email,
        });
        if (!isUserExist) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "User not found",
            });
            return;
        }
        const isPasswordMatched = (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password) === password;
        if (!isPasswordMatched) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "wrong password",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ _id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id, email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email }, process.env.MY_SECRET_KEY ? process.env.MY_SECRET_KEY : "FYSHAFRW", {
            expiresIn: "1d",
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "login success",
            token: token,
        });
    }
    catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message.toString(),
        });
    }
});
exports.httpLogin = httpLogin;
