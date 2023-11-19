import  express  from "express";
import { getAppointment, getAppointments, getAppointmentsUser, registerAppointment } from "../../controllers/appointmentsController.js";

const appointmentsRouter = express.Router()


appointmentsRouter.route('/')
    .get(getAppointments)
    .post(registerAppointment)
appointmentsRouter.route('/:id')
    .get(getAppointment)
appointmentsRouter.route('/user/:user')
    .get(getAppointmentsUser)





export default appointmentsRouter