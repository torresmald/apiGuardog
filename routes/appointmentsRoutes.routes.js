import  express  from "express";
import { getAppointments } from "../controllers/appointmentsController.js";

const appointmentsRouter = express.Router()


appointmentsRouter.route('/')
    .get(getAppointments)





export default appointmentsRouter