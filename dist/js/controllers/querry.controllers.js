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
exports.deletesingleQuerry = exports.httpGetOneQuerry = exports.httpGetQuerries = exports.httpCreateQuerry = void 0;
const QuerrySchema_1 = __importDefault(require("../models/QuerrySchema"));
const httpCreateQuerry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querry = new QuerrySchema_1.default({
            fullNames: req.body.fullNames,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
        });
        yield querry.save();
        res.status(201).json({ message: 'Message sents successfully', data: querry });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.httpCreateQuerry = httpCreateQuerry;
const httpGetQuerries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querries = yield QuerrySchema_1.default.find({});
        res.status(200).json({ message: "All querries", data: querries });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
});
exports.httpGetQuerries = httpGetQuerries;
// responses hve to be customised
const httpGetOneQuerry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const singleQuerry = yield QuerrySchema_1.default.findOne({ _id: req.params.id });
        if (!singleQuerry) {
            return res.status(404).json({ message: "Querry not found", data: {} });
        }
        res.status(200).json({ message: "Querry found", data: singleQuerry });
    }
    catch (error) {
        console.error('Error fetching querry:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.httpGetOneQuerry = httpGetOneQuerry;
// delete query
const deletesingleQuerry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedQuery = yield QuerrySchema_1.default.deleteOne({ _id: req.params.id });
        if (deletedQuery.deletedCount === 0) {
            return res.status(404).json({ message: "Querry not found" });
        }
        res.status(204).json({ message: "Querry deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deletesingleQuerry = deletesingleQuerry;
