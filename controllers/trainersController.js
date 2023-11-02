// import Trainer from '../models/Trainer.model.js'
// import { generateJWT } from '../utils/token/generateJWT.js';
import trainerService from "../services/trainers.services.js";


const getTrainers = async (request, response, next) => {
    try {
        const trainers = await trainerService.getTrainers()
        response.status(200).json(trainers)
    } catch (error) {
        return next(error)
    }
}

const loginTrainers = async (request, response) => {
    try {
        const user = await trainerService.loginTrainers(request.body)
        response.status(200).json(user)
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
    loginTrainers,
    registerTrainers
}