import Pet from '../models/Pet.model.js'
import Parent from '../models/Parent.model.js'
import {validateObjectId} from '../utils/validate/validate.js';
import petsService from '../services/pets.services.js';

const getPets = async (request, response, next) => {
    try {
        const allPets = await petsService.getPets()
        response.status(200).json(allPets)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const getPet = async (request, response, next) => {
    try {
        const id = request.params.id
        if (validateObjectId(id, response)) return
        const pet = await petsService.getPet(id)
        response.status(200).json(pet)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}


const registerPet = async (request, response, next) => {
    try {
        const data = {
            body: request.body,
            image: request.file
        }
        const newPet = await petsService.registerPet(data)
        response.status(200).json(newPet)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}


export {
    getPets,
    getPet,
    registerPet
}