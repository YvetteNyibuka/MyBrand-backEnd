"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querryValidate_1 = __importDefault(require("../validations/querryValidate"));
const isValid = (req, res, next) => {
    const { error } = (0, querryValidate_1.default)(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    try {
        next();
    }
    catch (error) {
        console.log('error', error);
    }
};
exports.default = isValid;
