"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    names: joi_1.default.string().required().min(3).max(30),
    email: joi_1.default.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: joi_1.default.string().min(5).required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,30}$'))
        .message('"{#label}" must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'),
    role: joi_1.default.string()
});
const validateUser = (userData) => {
    return userSchema.validate(userData);
};
exports.default = validateUser;
