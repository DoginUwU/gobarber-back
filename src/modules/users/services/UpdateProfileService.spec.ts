import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });
    it('should be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john_doe@example.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Alex doe',
            email: 'alex_doe@example.com',
        });

        expect(updatedUser.name).toBe('Alex doe');
        expect(updatedUser.email).toBe('alex_doe@example.com');
    });

    it('should not be able to change to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john_doe@example.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Test',
            email: 'test@example.com',
            password: '123456',
        });

        const updatedUser = updateProfile.execute({
            user_id: user.id,
            name: user.name,
            email: 'john_doe@example.com',
        });

        await expect(updatedUser).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john_doe@example.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: user.name,
            email: user.email,
            old_password: user.password,
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john_doe@example.com',
            password: '123456',
        });

        const updatedUser = updateProfile.execute({
            user_id: user.id,
            name: user.name,
            email: user.email,
            old_password: 'wrong-old-password',
            password: '123123',
        });

        await expect(updatedUser).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john_doe@example.com',
            password: '123456',
        });

        const updatedUser = updateProfile.execute({
            user_id: user.id,
            name: user.name,
            email: user.email,
            password: '123123',
        });

        await expect(updatedUser).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the profile from non-existing user', async () => {
        const profile = updateProfile.execute({
            user_id: 'non-existing-user-id',
            name: 'Test',
            email: 'test@example.com',
        });

        await expect(profile).rejects.toBeInstanceOf(AppError);
    });
});
