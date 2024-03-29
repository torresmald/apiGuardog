import express from "express";
import { getPet, getPets, registerPet, deletePet } from "../../controllers/petsController.js";
import uploadFile from "../../middlewares/files/files.middleware.js";
import uploadToCloud from "../../middlewares/files/cloudinary.middleware.js";

const petsRouter = express.Router();

petsRouter.route('')
    .get(getPets)

petsRouter.route('/:id')
    .get(getPet)
    .delete(deletePet)

petsRouter.route('/register')
    .post(uploadFile.single('image'), uploadToCloud, registerPet)

    
export default petsRouter;