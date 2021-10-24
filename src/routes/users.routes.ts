import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
    } catch (error) {
        if (error instanceof Error)
            return response.status(400).json({ error: error.message });

        return response.status(500);
    }
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        try {
            const { id } = request.user;
            const { file } = request;
            const updateUserAvatar = new UpdateUserAvatarService();

            const user = await updateUserAvatar.execute({
                user_id: id,
                avatarFilename: file?.filename,
            });

            delete user.password;

            return response.json(user);
        } catch (error) {
            if (error instanceof Error)
                return response.status(400).json({ error: error.message });

            return response.status(500);
        }
    },
);

export default usersRouter;
