import { Router } from "express";
import appointmentsRouter from "@modules/appointments/infra/http/routes/appointments.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import sessionRouter from "@modules/users/infra/http/routes/sessions.routes";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const routes = Router();

routes.use('/appointments', ensureAuthenticated, appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);

export default routes;
