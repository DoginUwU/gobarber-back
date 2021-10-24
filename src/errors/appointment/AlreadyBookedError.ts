import AppError from '../AppError';

class AlreadyBookedError extends AppError {
    constructor() {
        super('This appointment is already booked', 400);
    }
}

export { AlreadyBookedError };
