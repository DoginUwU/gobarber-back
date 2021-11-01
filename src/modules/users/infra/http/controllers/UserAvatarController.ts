import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

class UserAvatarController {
    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const { file } = request;
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        const user = await updateUserAvatar.execute({
            user_id: id,
            avatarFilename: file?.filename,
        });

        return response.json(classToClass(user));
    }
}

export default UserAvatarController;
