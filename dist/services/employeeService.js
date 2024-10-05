"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployee = exports.deleteEmployee = exports.addEmployee = exports.getAllEmployees = exports.loginEmployee = exports.registerEmployee = void 0;
const Employee_1 = __importDefault(require("../models/Employee"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerEmployee = async (name, email, password, role) => {
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const employee = new Employee_1.default({ name, email, password: hashedPassword, role });
    await employee.save();
};
exports.registerEmployee = registerEmployee;
const loginEmployee = async (email, password) => {
    const employee = await Employee_1.default.findOne({ email });
    if (!employee || !(await bcryptjs_1.default.compare(password, employee.password))) {
        throw new Error('Invalid credentials');
    }
    const token = jsonwebtoken_1.default.sign({ id: employee._id, role: employee.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
exports.loginEmployee = loginEmployee;
const getAllEmployees = async () => {
    return await Employee_1.default.find();
};
exports.getAllEmployees = getAllEmployees;
const addEmployee = async (name, email, password, role) => {
    const existingEmployee = await Employee_1.default.findOne({ email });
    if (existingEmployee) {
        throw new Error('Email already exists');
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const employee = new Employee_1.default({ name, email, password: hashedPassword, role });
    await employee.save();
};
exports.addEmployee = addEmployee;
const deleteEmployee = async (id) => {
    const employee = await Employee_1.default.findByIdAndDelete(id);
    if (!employee) {
        throw new Error('Employee not found');
    }
};
exports.deleteEmployee = deleteEmployee;
const updateEmployee = async (id, updatedData) => {
    const employee = await Employee_1.default.findByIdAndUpdate(id, updatedData, { new: true });
    if (!employee) {
        throw new Error('Employee not found');
    }
    return employee;
};
exports.updateEmployee = updateEmployee;
