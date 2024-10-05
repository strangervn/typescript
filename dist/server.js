"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        // Kết nối đến cơ sở dữ liệu nếu cần
        // await connectDB();
        app_1.default.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`API is accessible at http://localhost:${PORT}/api/employees`);
        });
    }
    catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1); // Thoát nếu có lỗi
    }
};
startServer();
