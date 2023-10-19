import express from "express";
import { getPet, getPets, registerPet } from "../controllers/petsController.js";

const petsRouter = express.Router();

petsRouter.route('')
    .get(getPets)

petsRouter.route('/:id')
    .get(getPet)

petsRouter.route('/register')
    .post(registerPet)

    
export default petsRouter;