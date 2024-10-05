import Employee from '../models/Employee';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerEmployee = async (name: string, email: string, password: string, role: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = new Employee({ name, email, password: hashedPassword, role });
    await employee.save();
};

export const loginEmployee = async (email: string, password: string) => {
    const employee = await Employee.findOne({ email });

    if (!employee || !(await bcrypt.compare(password, employee.password))) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: employee._id, role: employee.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    return token;
};

export const getAllEmployees = async () => {
    return await Employee.find();
};

export const addEmployee = async (name: string, email: string, password: string, role: string) => {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = new Employee({ name, email, password: hashedPassword, role });
    await employee.save();
};

export const deleteEmployee = async (id: string) => {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
        throw new Error('Employee not found');
    }
};

export const updateEmployee = async (id: string, updatedData: any) => {
    const employee = await Employee.findByIdAndUpdate(id, updatedData, { new: true });
    if (!employee) {
        throw new Error('Employee not found');
    }
    return employee;
};