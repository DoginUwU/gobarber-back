import { Router } from "express";
import { uuid } from "uuidv4";
import { startOfHour, parseISO } from "date-fns";

const appointmentsRouter = Router();

const appointments = [];

appointmentsRouter.post("/", (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const appointment = {
        id: uuid(),
        provider,
        date: parsedDate,
    };

    appointments.push(appointment);

    return response.json(appointment);
});

export default appointmentsRouter;
