"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeController_1 = require("../controllers/employeeController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// Đăng ký nhân viên
router.post('/register', employeeController_1.registerEmployee);
// Đăng nhập nhân viên
router.post('/login', employeeController_1.loginEmployee);
// Lấy danh sách nhân viên (chỉ dành cho admin)
router.get('/', auth_1.authenticate, (0, auth_1.authorize)('admin'), employeeController_1.getAllEmployees);
// Thêm nhân viên
router.post('/add', auth_1.authenticate, (0, auth_1.authorize)('admin'), employeeController_1.addEmployee);
// Xóa nhân viên
router.delete('/:id', auth_1.authenticate, (0, auth_1.authorize)('admin'), employeeController_1.deleteEmployee);
// Sửa nhân viên theo ID
router.put('/:id', auth_1.authenticate, (0, auth_1.authorize)('admin'), employeeController_1.updateEmployee);
exports.default = router;
