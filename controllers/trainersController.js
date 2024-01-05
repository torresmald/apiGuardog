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
        const data = {
            body: request.body,
            image: request.file
        }
        const user = await trainerService.registerTrainers(data)
        response.status(200).json(user)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const editDataTrainer = async (request, response, next) => {
    const { id } = request.params
    const data = request.body
    try {
        const message = await trainerService.editDataTrainer(id, data)
        response.status(201).json(message)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

export {
    getTrainers,
    getTrainer,
    loginTrainers,
    registerTrainers,
    editDataTrainer
}