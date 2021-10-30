import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '../providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('MailProvider')
        private mailProvider: IMailProvider,
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
    ) {}

    public async execute(data: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(data.email);

        if (!user) throw new AppError('User does not exists.');

        await this.userTokensRepository.generate(user.id);

        await this.mailProvider.sendMail(data.email, 'Forgot Password');
    }
}

export default SendForgotPasswordEmailService;
