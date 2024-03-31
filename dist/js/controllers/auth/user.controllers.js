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
exports.deletesingleUser = exports.httpUpdateOneUser = exports.httpGetOneUser = exports.httpGetUsers = exports.httpCreateUser = void 0;
const userSchema_1 = __importDefault(require("../../models/auth/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const httpCreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { names, email } = req.body;
        const { password } = req.body;
        const { role } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const existingUser = yield userSchema_1.default.findOne({ email });
        if (existingUser) {
            return res
                .status(409)
                .json({
                message: "Email already registered",
            });
        }
        const user = new userSchema_1.default({
            names: names,
            email: email,
            password: hashedPassword,
            role: role,
        });
        yield user.save();
        const savedUser = yield userSchema_1.default.findById(user._id);
        if (savedUser) {
            const response = {
                _id: savedUser._id,
                names: savedUser.names,
                email: savedUser.email,
                role: savedUser.role,
                createdAt: savedUser.createdAt,
                updatedAt: savedUser.updatedAt
            };
            res
                .status(201)
                .json({ message: "user registered successfully ", data: response });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.httpCreateUser = httpCreateUser;
const httpGetUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userSchema_1.default.find({});
        if (!users) {
            res.status(404).json({ message: "No users found", data: {} });
            return;
        }
        res.status(200).json({ message: "All users registered", data: users });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
exports.httpGetUsers = httpGetUsers;
const httpGetOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleUser = yield userSchema_1.default.findOne({ _id: req.params.id });
        if (!singleUser) {
            return res.status(404).json({ message: "User not found", data: {} });
        }
        const singleuserdata = {
            id: singleUser._id,
            names: singleUser.names,
            email: singleUser.email,
            role: singleUser.role
        };
        res.status(200).json({ message: "User found", data: singleuserdata });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.httpGetOneUser = httpGetOneUser;
const httpUpdateOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id.trim();
        const user = yield userSchema_1.default.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found", data: null });
        }
        user.names = req.body.names;
        user.email = req.body.email;
        user.password = req.body.password;
        yield user.save();
        return res.status(200).json({ message: "User updated successfully", data: user });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.httpUpdateOneUser = httpUpdateOneUser;
const deletesingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield userSchema_1.default.deleteOne({ _id: req.params.id });
        if (deletedUser.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(204).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deletesingleUser = deletesingleUser;
