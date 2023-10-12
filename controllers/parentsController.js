import Parents from '../models/Parent.model.js'
import {validateObjectId} from '../utils/validate/validate.js';


const getParents = async (request, response, next) => {
    try {
        const allParents = await Parents.find().populate('pets')
        if (allParents.length === 0) {
            return response.status(200).json('No hay Padres Disponibles');
        }
        return response.status(200).json(allParents)
    } catch (error) {
        return next(error)
    }
}


const getParent = async (request, response, next) => {
    try {
        const id = request.params.id
        if (validateObjectId(id, response)) return

        const parent = await Parents.findById(id).populate('pets')
        if (parent.length === 0) {
            return response.status(200).json(`Padre con ${id} no encontrado`);
        }
        return response.status(200).json(parent)
    } catch (error) {
        return next(error)
    }
}


export {
    getParents,
    getParent
}