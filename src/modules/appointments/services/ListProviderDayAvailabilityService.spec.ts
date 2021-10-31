import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderDayAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvailabilityService =
            new ListProviderDayAvailabilityService(fakeAppointmentsRepository);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 9, 20, 11).getTime();
        });
    });
    it('should be able to list the day availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2021, 9, 20, 14, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2021, 9, 20, 15, 0, 0),
        });

        const availability = await listProviderDayAvailabilityService.execute({
            provider_id: 'user',
            year: 2021,
            month: 10,
            day: 20,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 10, available: false },
                { hour: 11, available: false },
                { hour: 12, available: true },
                { hour: 13, available: true },
                { hour: 14, available: false },
                { hour: 15, available: false },
            ]),
        );
    });
});
