import nodemailer, { Transporter } from "nodemailer";
import { inject, injectable } from "tsyringe";
import mailConfig from "@config/mail";
import IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider";
import ISendMailDTO from "../dtos/ISendMailDTO";
import IMailProvider from "../models/IMailProvider";

@injectable()
class MailTrapMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject("MailTemplateProvider")
        private mailTemplateProvider: IMailTemplateProvider
    ) {
        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });
        this.client = transporter;
    }

    public async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMailDTO): Promise<void> {
        const info = await this.client.sendMail({
            from: {
                name: from?.name || mailConfig.defaults.email,
                address: from?.email || mailConfig.defaults.name,
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
}

export default MailTrapMailProvider;
