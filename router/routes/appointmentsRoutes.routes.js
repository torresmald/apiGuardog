import  express  from "express";
import { getAppointmentByDay, getAppointments, getAppointmentsUser, registerAppointment } from "../../controllers/appointmentsController.js";

const appointmentsRouter = express.Router()


appointmentsRouter.route('/')
    .get(getAppointments)
    .post(registerAppointment)
appointmentsRouter.route('/date')
    .get(getAppointmentByDay)
appointmentsRouter.route('/user/:user')
    .get(getAppointmentsUser)





export default appointmentsRouter