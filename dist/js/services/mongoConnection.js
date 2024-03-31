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
exports.connectToTestDB = exports.connectToDevelopmentDB = exports.disconnectFromMongoDB = exports.connectToMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connection.on('open', () => {
    console.info('MongoDB connected');
});
mongoose_1.default.connection.on('close', () => {
    console.info('MongoDB connection closed');
});
mongoose_1.default.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
const connectToMongoDB = (databaseURI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(databaseURI);
        console.info('MongoDB connected');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
});
exports.connectToMongoDB = connectToMongoDB;
const disconnectFromMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.disconnect();
        console.info('MongoDB disconnected');
    }
    catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
});
exports.disconnectFromMongoDB = disconnectFromMongoDB;
// For development environment
const devDatabaseURI = process.env.DEV_DATABASE_URL;
const connectToDevelopmentDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.connectToMongoDB)(devDatabaseURI);
});
exports.connectToDevelopmentDB = connectToDevelopmentDB;
// For testing environment
const testURI = process.env.TESTDATABASE_URL;
const connectToTestDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.connectToMongoDB)(testURI);
});
exports.connectToTestDB = connectToTestDB;
