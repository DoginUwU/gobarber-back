import { AlreadyBookedError } from '@shared/errors/appointment';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let provider_id: string;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        provider_id = Math.floor(Math.random() * 1000).toString();
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });
    it('should be able to create a new appointment', async () => {
        const appointment = await createAppointment.execute({
            date: new Date(),
            user_id: '123123',
            provider_id,
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe(provider_id);
    });

    it('should not be able to create two appointments on the same time', async () => {
        const appointmentDate = new Date();

        await createAppointment.execute({
            date: appointmentDate,
            user_id: '123123',
            provider_id,
        });

        const appointment = createAppointment.execute({
            date: appointmentDate,
            user_id: '123123',
            provider_id,
        });

        expect(appointment).rejects.toBeInstanceOf(AlreadyBookedError);
    });
});
