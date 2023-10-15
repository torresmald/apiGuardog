import express from "express";
import { getTrainers } from "../controllers/trainersController.js";

const trainersRouter = express.Router();

trainersRouter.route('')
    .get(getTrainers)

export default trainersRouter