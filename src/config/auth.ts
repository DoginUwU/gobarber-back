export default {
    jwt: {
        secret: process.env.JWT_TOKEN || 'd0b46ff929821f313bd37ab905eeb5ce',
        expiresIn: '1d',
    },
};
