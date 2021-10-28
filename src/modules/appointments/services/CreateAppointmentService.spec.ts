import { AlreadyBookedError } from '@shared/errors/appointment';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const provider_id = Math.floor(Math.random() * 1000).toString();
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id,
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe(provider_id);
    });

    it('should not be able to create two appointments on the same time', async () => {
        const appointmentDate = new Date();
        const provider_id = Math.floor(Math.random() * 1000).toString();
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );

        await createAppointment.execute({
            date: appointmentDate,
            provider_id,
        });

        const appointment = createAppointment.execute({
            date: appointmentDate,
            provider_id,
        });

        expect(appointment).rejects.toBeInstanceOf(AlreadyBookedError);
    });
});
