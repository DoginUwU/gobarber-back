import { container } from "tsyringe";
import mailConfig from "@config/mail";
import EtherealMailProvider from "./implementations/EtherealMailProvider";
import MailTrapMailProvider from "./implementations/SendGridMailProvider";
import IMailProvider from "./models/IMailProvider";

const providers = {
    ethereal: container.resolve(EtherealMailProvider),
    mailTrap: container.resolve(MailTrapMailProvider),
};

container.registerInstance<IMailProvider>(
    "MailProvider",
    providers[mailConfig.driver]
);
