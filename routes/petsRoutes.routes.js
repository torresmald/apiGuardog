import express from "express";
import { getPet, getPets } from "../controllers/petsController.js";

const petsRouter = express.Router();

petsRouter.route('')
    .get(getPets)

petsRouter.route('/:id')
    .get(getPet)


export default petsRouter;