import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import ListProviderAppointmentsService from "./ListProviderAppointmentsService";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe("ListProviderAppointmentsService", () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviderAppointmentsService = new ListProviderAppointmentsService(
            fakeAppointmentsRepository,
            fakeCacheProvider
        );
    });
    it("should be able to list the appointments on a specific day", async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: "provider",
            user_id: "123123",
            date: new Date(2021, 9, 20, 14, 0, 0),
        });

        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: "provider",
            user_id: "123123",
            date: new Date(2021, 9, 20, 15, 0, 0),
        });

        const appointments = await listProviderAppointmentsService.execute({
            provider_id: "provider",
            year: 2021,
            month: 10,
            day: 20,
        });

        expect(appointments).toEqual([appointment1, appointment2]);
    });
});
