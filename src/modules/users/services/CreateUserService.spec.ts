import { AlreadyEmailError } from '@shared/errors/user/AlreadyEmailError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });
    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'john_doe@example.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with same email from another', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'john_doe@example.com',
            password: '123456',
        });
        const user = createUser.execute({
            name: 'Alex Doe',
            email: 'john_doe@example.com',
            password: '123456789',
        });

        await expect(user).rejects.toBeInstanceOf(AlreadyEmailError);
    });
});
