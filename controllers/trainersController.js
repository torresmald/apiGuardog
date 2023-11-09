// import Trainer from '../models/Trainer.model.js'
// import { generateJWT } from '../utils/token/generateJWT.js';
import trainerService from "../services/trainers.services.js";
import { generateJWT } from "../utils/token/generateJWT.js";


const getTrainers = async (request, response, next) => {
    try {
        const trainers = await trainerService.getTrainers()
        response.status(200).json(trainers)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const getTrainer = async (request, response, next) => {
    try {
        const id = request.params.id
        const trainer = await trainerService.getTrainer(id)
        response.status(200).json(trainer)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const loginTrainers = async (request, response) => {
    try {
        const user = await trainerService.loginTrainers(request.body)
        const token = generateJWT(user._id)
        response.status(200).json({
            user,
            token
        })
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const registerTrainers = async (request, response, next) => {
    try {
        const user = await trainerService.registerTrainers(request.body)
        response.status(200).json(user)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

export {
    getTrainers,
    getTrainer,
    loginTrainers,
    registerTrainers
}