"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployee = exports.deleteEmployee = exports.addEmployee = exports.getAllEmployees = exports.loginEmployee = exports.registerEmployee = void 0;
const employeeService = __importStar(require("../services/employeeService"));
const registerEmployee = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        await employeeService.registerEmployee(name, email, password, role);
        res.status(201).json({ message: 'Employee registered' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};
exports.registerEmployee = registerEmployee;
const loginEmployee = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const token = await employeeService.loginEmployee(email, password);
        res.json({ token });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message });
        }
        else {
            res.status(401).json({ message: 'An unknown error occurred' });
        }
    }
};
exports.loginEmployee = loginEmployee;
const getAllEmployees = async (req, res) => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.json(employees);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getAllEmployees = getAllEmployees;
const addEmployee = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        await employeeService.addEmployee(name, email, password, role);
        res.status(201).json({ message: 'Employee added successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};
exports.addEmployee = addEmployee;
const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        await employeeService.deleteEmployee(id);
        res.json({ message: 'Employee deleted successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        }
        else {
            res.status(404).json({ message: 'Employee not found' });
        }
    }
};
exports.deleteEmployee = deleteEmployee;
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    const updatedData = {};
    if (name)
        updatedData.name = name;
    if (email)
        updatedData.email = email;
    if (role)
        updatedData.role = role;
    try {
        const updatedEmployee = await employeeService.updateEmployee(id, updatedData);
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee updated successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        }
        else {
            res.status(404).json({ message: 'An unknown error occurred' });
        }
    }
};
exports.updateEmployee = updateEmployee;
