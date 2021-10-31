import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class AppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;

        const listAppointments = container.resolve(ListProvidersService);

        const appointment = await listAppointments.execute({
            user_id,
        });

        return response.json(appointment);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({
            provider_id,
            user_id,
            date: parsedDate,
        });

        return response.json(appointment);
    }
}

export default AppointmentsController;
