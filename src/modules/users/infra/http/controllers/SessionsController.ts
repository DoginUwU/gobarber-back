import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class SessionsController {
    async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        // @ts-ignore
        delete user.password;

        return response.json({ user, token });
    }
}

export default SessionsController;
