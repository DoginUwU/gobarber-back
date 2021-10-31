import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        listProviders = new ListProvidersService(fakeUsersRepository);
    });
    it('should be able to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'Alex Doe',
            email: 'alex_doe@example.com',
            password: '123456',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'Jonas Doe',
            email: 'jonas_doe@example.com',
            password: '123456',
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john_doe@example.com',
            password: '123456',
        });

        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([user1, user2]);
    });
});
