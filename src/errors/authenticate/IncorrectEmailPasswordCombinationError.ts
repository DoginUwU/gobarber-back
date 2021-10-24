import AppError from '../AppError';

class IncorrectEmailPasswordCombinationError extends AppError {
    constructor() {
        super('Incorrect email/password combination.', 401);
    }
}

export { IncorrectEmailPasswordCombinationError };
