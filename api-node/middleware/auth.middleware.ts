import {parseToken} from "../services/jwt";
import { Request, Response, NextFunction } from 'express';


export interface AuthRequest extends Request {
    user: { username: string; email: string }; // Define the user property
}

export const authMiddleware = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.sendStatus(401);
        return
    }

    const userData = parseToken(token);
    if (userData) {
        req.user = userData;
        next();
    }
}
