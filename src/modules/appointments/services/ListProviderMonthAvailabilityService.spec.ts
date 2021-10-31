import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderMonthAvailabilityService =
            new ListProviderMonthAvailabilityService(
                fakeAppointmentsRepository,
            );
    });
    it('should be able to list the month availability from provider', async () => {
        const appointments = Array(10)
            .fill(null)
            .map(async (_, index) => {
                await fakeAppointmentsRepository.create({
                    provider_id: 'user',
                    user_id: '123123',
                    date: new Date(2021, 9, 30, index + 1, 0, 0),
                });
            });

        await Promise.all(appointments);

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: '123123',
            date: new Date(2021, 9, 31, 12, 0, 0),
        });

        const availability = await listProviderMonthAvailabilityService.execute(
            {
                provider_id: 'user',
                year: 2021,
                month: 10,
            },
        );

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 30, available: false },
                { day: 31, available: true },
            ]),
        );
    });
});
