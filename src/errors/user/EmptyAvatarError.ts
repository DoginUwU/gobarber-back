import AppError from '../AppError';

class EmptyAvatarError extends AppError {
    constructor() {
        super('You must provide an avatar', 400);
    }
}

export { EmptyAvatarError };
