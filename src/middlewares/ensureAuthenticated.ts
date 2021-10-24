import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface JwtProvider {
    iat: number;
    exp: number;
    sub: string;
}

const ensureAuthenticated = (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new Error('Token is missing');

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as JwtProvider;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new Error('Invalid token');
    }
};

export default ensureAuthenticated;
