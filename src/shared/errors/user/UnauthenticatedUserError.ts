import AppError from '../AppError';

class UnauthenticatedUserError extends AppError {
    constructor() {
        super("You're not authenticated", 401);
    }
}

export { UnauthenticatedUserError };
