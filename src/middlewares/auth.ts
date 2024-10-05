import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            return res.status(401).send('Invalid Token');
        }
            (req as any).user = user;
            next();
    });
};

export const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes((req as any).user.role)) {
            return res.status(403).send('Access denied');
        }
        next();
    };
};
