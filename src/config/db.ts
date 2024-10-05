import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Đảm bảo gọi trước khi sử dụng biến môi trường

const connectDB = async () => {
    try {
        const mongodbUri = process.env.MONGODB_URI;

        if (!mongodbUri) {
            throw new Error('MONGODB_URI is not defined in .env file');
        }

        await mongoose.connect(mongodbUri);

        console.log('Kết nối đến MongoDB thành công!');
    } catch (err) {
        console.error('Kết nối đến MongoDB thất bại:', err);
    }
};

export default connectDB;