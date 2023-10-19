import express from "express";
import { getTrainers, loginTrainers } from "../controllers/trainersController.js";

const trainersRouter = express.Router();

trainersRouter.route('')
    .get(getTrainers)

trainersRouter.route('/login')
    .post(loginTrainers)

export default trainersRouter