import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageProvider = new FakeStorageProvider();
        updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );
    });
    it('should be able to update a user avatar', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john_doe@example.com',
            password: '123456',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.png',
        });

        expect(user.avatar).toBe('avatar.png');
    });
    it('should not be able to update a user avatar from non existing user', async () => {
        const updateAvatar = updateUserAvatar.execute({
            user_id: 'not-existing-user',
            avatarFilename: 'avatar.png',
        });

        expect(updateAvatar).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update a user avatar without a image', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john_doe@example.com',
            password: '123456',
        });

        const updateAvatar = updateUserAvatar.execute({
            user_id: user.id,
        });

        expect(updateAvatar).rejects.toBeInstanceOf(AppError);
    });
    it('should not delete old avatar when updating new one', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john_doe@example.com',
            password: '123456',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.png',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar2.png',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.png');
        expect(user.avatar).toBe('avatar2.png');
    });
});
