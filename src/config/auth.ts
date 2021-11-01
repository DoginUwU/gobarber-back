export default {
    jwt: {
        secret: process.env.APP_SECRET || "d0b46ff929821f313bd37ab905eeb5ce",
        expiresIn: "1d",
    },
};
