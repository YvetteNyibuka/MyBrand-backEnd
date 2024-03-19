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
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const httpLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const { email, password } = user;
        const isUserExist = yield userSchema_1.default.findOne({ email: email });
        if (!isUserExist) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "User not found",
            });
        }
        const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Wrong password",
            });
        }
        const token = jsonwebtoken_1.default.sign({ _id: isUserExist._id, email: isUserExist.email }, process.env.MY_SECRET_KEY || "FYSHAFRW", {
            expiresIn: "1d",
        });
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Login success",
            token: token,
        });
    }
    catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message.toString(),
        });
    }
});
exports.httpLogin = httpLogin;
