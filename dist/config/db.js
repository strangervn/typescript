"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Đảm bảo gọi trước khi sử dụng biến môi trường
const connectDB = async () => {
    try {
        const mongodbUri = process.env.MONGODB_URI;
        if (!mongodbUri) {
            throw new Error('MONGODB_URI is not defined in .env file');
        }
        await mongoose_1.default.connect(mongodbUri);
        console.log('Kết nối đến MongoDB thành công!');
    }
    catch (err) {
        console.error('Kết nối đến MongoDB thất bại:', err);
    }
};
exports.default = connectDB;
