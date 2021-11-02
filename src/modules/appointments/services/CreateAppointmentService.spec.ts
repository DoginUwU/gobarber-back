import FakeNotificationsRepository from "@modules/notifications/repositories/fakes/FakeNotificationsRepository";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";
import AppError from "@shared/errors/AppError";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import CreateAppointmentService from "./CreateAppointmentService";

let provider_id: string;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe("CreateAppointment", () => {
    beforeEach(() => {
        provider_id = Math.floor(Math.random() * 1000).toString();
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
            fakeCacheProvider
        );
    });
    it("should be able to create a new appointment", async () => {
        jest.spyOn(Date, "now").mockImplementationOnce(() => {
            return new Date(2021, 9, 31, 12).getTime();
        });

        const appointment = await createAppointment.execute({
            date: new Date(2021, 9, 31, 13),
            user_id: "123123",
            provider_id,
        });

        expect(appointment).toHaveProperty("id");
        expect(appointment.provider_id).toBe(provider_id);
    });

    it("should not be able to create two appointments on the same time", async () => {
        jest.spyOn(Date, "now").mockImplementationOnce(() => {
            return new Date(2021, 10, 1, 10).getTime();
        });

        const appointmentDate = new Date(2021, 10, 1, 14);

        await createAppointment.execute({
            date: appointmentDate,
            user_id: "123123",
            provider_id,
        });

        const appointment = createAppointment.execute({
            date: appointmentDate,
            user_id: "123123",
            provider_id,
        });

        await expect(appointment).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create an appointment on a past date", async () => {
        jest.spyOn(Date, "now").mockImplementationOnce(() => {
            return new Date(2021, 9, 31, 12).getTime();
        });

        const appointment = createAppointment.execute({
            date: new Date(2021, 9, 31, 11),
            user_id: "123123",
            provider_id,
        });

        await expect(appointment).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create an appointment with same users as provider", async () => {
        jest.spyOn(Date, "now").mockImplementationOnce(() => {
            return new Date(2021, 9, 31, 12).getTime();
        });

        const appointment = createAppointment.execute({
            date: new Date(2021, 9, 31, 13),
            user_id: provider_id,
            provider_id,
        });

        await expect(appointment).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create an appointment before 8am and after 5pm schedule", async () => {
        jest.spyOn(Date, "now").mockImplementationOnce(() => {
            return new Date(2021, 9, 30, 12).getTime();
        });

        const appointment7am = createAppointment.execute({
            date: new Date(2021, 9, 31, 7),
            user_id: "123123",
            provider_id,
        });

        const appointment18pm = createAppointment.execute({
            date: new Date(2021, 9, 31, 18),
            user_id: "123123",
            provider_id,
        });

        await expect(appointment7am).rejects.toBeInstanceOf(AppError);
        await expect(appointment18pm).rejects.toBeInstanceOf(AppError);
    });
});
