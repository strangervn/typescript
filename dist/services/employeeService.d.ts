export declare const registerEmployee: (name: string, email: string, password: string, role: string) => Promise<void>;
export declare const loginEmployee: (email: string, password: string) => Promise<string>;
export declare const getAllEmployees: () => Promise<any>;
export declare const addEmployee: (name: string, email: string, password: string, role: string) => Promise<void>;
export declare const deleteEmployee: (id: string) => Promise<void>;
export declare const updateEmployee: (id: string, updatedData: any) => Promise<any>;
