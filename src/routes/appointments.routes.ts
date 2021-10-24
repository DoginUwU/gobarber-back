import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
appointmentsRouter.get('/', async (_, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    return response.json(await appointmentsRepository.find());
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            provider,
            date: parsedDate,
        });

        return response.json(appointment);
    } catch (error) {
        if (error instanceof Error)
            return response.status(400).json({ error: error.message });

        return response.status(500);
    }
});

export default appointmentsRouter;
