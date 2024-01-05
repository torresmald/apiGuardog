import express from "express";
import { getTrainer, getTrainers, loginTrainers, registerTrainers, editDataTrainer } from "../../controllers/trainersController.js";
import uploadFile from "../../middlewares/files/files.middleware.js";
import uploadToCloud from "../../middlewares/files/cloudinary.middleware.js";

const trainersRouter = express.Router();

trainersRouter.route('')
    .get(getTrainers)
trainersRouter.route('/:id')
    .get(getTrainer)
    .put(editDataTrainer)

trainersRouter.route('/login')
    .post(loginTrainers)

trainersRouter.route('/register')
    .post(uploadFile.single('image'), uploadToCloud,  registerTrainers)

export default trainersRouter