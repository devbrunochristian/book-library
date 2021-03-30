import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            jwt.verify(token, process.env.JWT_SECRET!)
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
        next()
    } else {
        res.status(401).json({ error: 'unauthorized' });
    }
};

export default authenticateJWT;