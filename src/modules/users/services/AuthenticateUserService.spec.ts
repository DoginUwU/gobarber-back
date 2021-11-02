import { IncorrectEmailPasswordCombinationError } from "@shared/errors/authenticate/IncorrectEmailPasswordCombinationError";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe("AuthenticateUser", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();
        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeCacheProvider
        );
        authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider
        );
    });
    it("should be able to authenticate", async () => {
        const data = {
            email: "authenticated@example.com",
            password: "123456",
        };

        const user = await createUser.execute({ ...data, name: "Jhon doe" });

        const response = await authenticateUser.execute(data);

        expect(response).toHaveProperty("token");
        expect(response.user).toEqual(user);
    });

    it("should not be able to authenticate with non existing user", async () => {
        const data = {
            email: "not_authenticated@example.com",
            password: "123456",
        };

        const response = authenticateUser.execute(data);

        expect(response).rejects.toBeInstanceOf(
            IncorrectEmailPasswordCombinationError
        );
    });

    it("should not be able to authenticate with wrong password", async () => {
        const data = {
            email: "authenticated@example.com",
            password: "123456",
        };

        await createUser.execute({
            email: data.email,
            name: "Jhon doe",
            password: "another_password",
        });

        const response = authenticateUser.execute(data);

        expect(response).rejects.toBeInstanceOf(
            IncorrectEmailPasswordCombinationError
        );
    });
});
