import Pet from '../models/Pet.model.js'
import validateObjectId from '../utils/validate/validate.js';

const getPets = async (request, response, next) => {
    try {
        const allPets = await Pet.find()
        if (allPets.length === 0) {
            return response.status(200).json('No hay Mascotas Disponibles');
        }
        response.status(200).json(allPets)
    } catch (error) {
        return next(error)
    }
}

const getPet = async (request, response, next) => {
    try {
        const id = request.params.id
        if (validateObjectId(id, response)) return

        const pet = await Pet.findById(id)
        if (pet.length === 0) {
            return response.status(200).json(`No hay Mascota con el id: ${id}`);
        }
        response.status(200).json(pet)
    } catch (error) {
        return next(error)
    }
}


export {
    getPets,
    getPet
}