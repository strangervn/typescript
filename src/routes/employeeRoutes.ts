import { Router } from 'express';
import {
    registerEmployee,
    loginEmployee,
    getAllEmployees,
    addEmployee,
    deleteEmployee,
    updateEmployee
} from '../controllers/employeeController';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();

// Đăng ký nhân viên
router.post('/register', registerEmployee);

// Đăng nhập nhân viên
router.post('/login', loginEmployee);

// Lấy danh sách nhân viên (chỉ dành cho admin)
router.get('/', authenticate, authorize('admin'), getAllEmployees);

// Thêm nhân viên
router.post('/add', authenticate, authorize('admin'), addEmployee);

// Xóa nhân viên
router.delete('/:id', authenticate, authorize('admin'), deleteEmployee);

// Sửa nhân viên theo ID
router.put('/:id', authenticate, authorize('admin'), updateEmployee);

export default router;