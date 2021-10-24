import AppError from '../AppError';

class AlreadyEmailError extends AppError {
    constructor() {
        super('Email already used', 400);
    }
}

export { AlreadyEmailError };
