import AppError from '@shared/errors/AppError';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import FakeMailProvider from '../providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let userData: ICreateUserDTO = {} as ICreateUserDTO;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        userData = {
            name: 'John Doe',
            email: 'john_doe@example.com',
            password: '123456',
        };
    });
    it('should be able to recover the password using email', async () => {
        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository,
        );
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create(userData);

        await sendForgotPasswordEmail.execute({
            email: userData.email,
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a non-existing user password', async () => {
        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository,
        );

        const response = sendForgotPasswordEmail.execute({
            email: 'non-existing@user.com.br',
        });

        await expect(response).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository,
        );
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRepository.create(userData);

        await sendForgotPasswordEmail.execute({
            email: userData.email,
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
