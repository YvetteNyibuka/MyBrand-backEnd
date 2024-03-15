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
// create a user
const httpCreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { names, email } = req.body;
        const { password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = new userSchema_1.default({
            names: names,
            email: email,
            password: hashedPassword,
        });
        yield user.save();
        res.status(201).json({ message: "user registered successfully ", data: user });
    }
    catch (error) {
        console.error("Error error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.httpCreateUser = httpCreateUser;
// get all users
const httpGetUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userSchema_1.default.find({});
        res.status(200).json({ message: "All users", data: users });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
});
exports.httpGetUsers = httpGetUsers;
const httpGetOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleUser = yield userSchema_1.default.findOne({ _id: req.params.id });
        if (!singleUser) {
            return res.status(404).json({ message: "User not found", data: {} });
        }
        res.status(200).json({ message: "User found", data: singleUser });
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.httpGetOneUser = httpGetOneUser;
// update single user
const httpUpdateOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id.trim();
        const user = yield userSchema_1.default.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found", data: null });
        }
        if (req.body.names) {
            user.names = req.body.names;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.password) {
            user.password = req.body.password;
        }
        yield user.save();
        res.status(200).json({ message: "User updated successfully", data: user });
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.httpUpdateOneUser = httpUpdateOneUser;
// delete User
const deletesingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userSchema_1.default.deleteOne({ _id: req.params.id });
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deletesingleUser = deletesingleUser;
