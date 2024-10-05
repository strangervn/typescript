import { Request, Response } from 'express';
export declare const registerEmployee: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const loginEmployee: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllEmployees: (req: Request, res: Response) => Promise<void>;
export declare const addEmployee: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteEmployee: (req: Request, res: Response) => Promise<void>;
export declare const updateEmployee: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
