import express from "express";
import { getTrainers, loginTrainers, registerTrainers } from "../../controllers/trainersController.js";

const trainersRouter = express.Router();

trainersRouter.route('')
    .get(getTrainers)

trainersRouter.route('/login')
    .post(loginTrainers)

trainersRouter.route('/register')
    .post(registerTrainers)

export default trainersRouter