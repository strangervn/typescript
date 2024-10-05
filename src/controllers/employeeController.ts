import { Request, Response } from 'express';
import * as employeeService from '../services/employeeService';

export const registerEmployee = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        await employeeService.registerEmployee(name, email, password, role);
        res.status(201).json({ message: 'Employee registered' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

export const loginEmployee = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const token = await employeeService.loginEmployee(email, password);
        res.json({ token });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(401).json({ message: 'An unknown error occurred' });
        }
    }
};

export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const addEmployee = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        await employeeService.addEmployee(name, email, password, role);
        res.status(201).json({ message: 'Employee added successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await employeeService.deleteEmployee(id);
        res.json({ message: 'Employee deleted successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    const updatedData: any = {};

    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (role) updatedData.role = role;

    try {
        const updatedEmployee = await employeeService.updateEmployee(id, updatedData);
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee updated successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        } else {
            res.status(404).json({ message: 'An unknown error occurred' });
        }
    }
};