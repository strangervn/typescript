"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const logger_1 = require("./middlewares/logger");
const errorHandler_1 = require("./middlewares/errorHandler");
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// app.use(express.static('public'));
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });
// Sử dụng express.json() để phân tích cú pháp JSON
app.use(express_1.default.json());
// Sử dụng logger middleware
app.use(logger_1.logger);
// Kết nối đến MongoDB
(0, db_1.default)();
// Định nghĩa các route
app.use('/api/employees', employeeRoutes_1.default);
// Middleware xử lý lỗi
app.use(errorHandler_1.errorHandler);
exports.default = app;
