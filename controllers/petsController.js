import Pet from '../models/Pet.model.js'
import Parent from '../models/Parent.model.js'
import {validateObjectId} from '../utils/validate/validate.js';
import petsService from '../services/pets.services.js';

const getPets = async (request, response, next) => {
    try {
        const allPets = await petsService.getPets()
        response.status(200).json(allPets)
    } catch (error) {
        return next(error)
    }
}

const getPet = async (request, response, next) => {
    try {
        const id = request.params.id
        if (validateObjectId(id, response)) return
        const pet = await petsService.getPet(id)
        response.status(200).json(pet)
    } catch (error) {
        return next(error)
    }
}


const registerPet = async (request, response, next) => {
    try {
        const newPet = await petsService.registerPet(request.body)
        response.status(200).json(newPet)
    } catch (error) {
        return next(error)
    }
}


export {
    getPets,
    getPet,
    registerPet
}