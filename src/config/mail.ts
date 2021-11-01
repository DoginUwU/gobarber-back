interface IMailConfig {
    driver: "ethereal" | "mailTrap";

    defaults: {
        email: string;
        name: string;
    };
}

export default {
    driver: process.env.MAIL_DRIVER || "ethereal",

    defaults: {
        email: "equipe@gobarber.com.br",
        name: "Equipe GoBarber",
    },
} as IMailConfig;
