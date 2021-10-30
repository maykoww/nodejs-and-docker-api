import { Router } from "express";
import appointmentsRouter from "./appointments.routes";
import usersRouter from "./users.routes";
import sessionRouter from "./sessions.routes";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const routes = Router();

routes.use('/appointments', ensureAuthenticated, appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);

export default routes;
