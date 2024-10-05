import express from 'express';
import employeeRoutes from './routes/employeeRoutes';
import  {logger} from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });
// Sử dụng express.json() để phân tích cú pháp JSON
app.use(express.json());
// Sử dụng logger middleware
app.use(logger);
// Kết nối đến MongoDB
connectDB();

// Định nghĩa các route
app.use('/api/employees', employeeRoutes);

// Middleware xử lý lỗi
app.use(errorHandler);

export default app;