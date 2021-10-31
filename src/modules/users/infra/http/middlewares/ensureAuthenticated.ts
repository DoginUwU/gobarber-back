import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface IJwtProvider {
    iat: number;
    exp: number;
    sub: string;
}

const ensureAuthenticated = (
    request: Request,
    _: Response,
    next: NextFunction,
): void => {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError('Token is missing', 401);

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as IJwtProvider;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError('Invalid token', 403);
    }
};

export default ensureAuthenticated;
