import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        showProfile = new ShowProfileService(fakeUsersRepository);
    });
    it('should be able to show the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john_doe@example.com',
            password: '123456',
        });

        const profile = await showProfile.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe(user.name);
        expect(profile.email).toBe(user.email);
    });

    it('should not be able to show the profile from non-existing user', async () => {
        const profile = showProfile.execute({
            user_id: 'non-existing-user-id',
        });

        await expect(profile).rejects.toBeInstanceOf(AppError);
    });
});
