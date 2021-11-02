import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import AppointmentsController from "../controllers/AppointmentsController";
import ProviderAppointmentsController from "../controllers/ProviderAppointmentsController";

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.date().required(),
        },
    }),
    appointmentsController.create
);
appointmentsRouter.get(
    "/me",
    celebrate({
        [Segments.QUERY]: {
            day: Joi.number().required(),
            month: Joi.number().required(),
            year: Joi.number().required(),
        },
    }),
    providerAppointmentsController.index
);

export default appointmentsRouter;
