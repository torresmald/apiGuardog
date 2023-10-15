import Trainer from '../models/Trainer.model.js'


const getTrainers = async (request, response, next) => {
    try {
        const allTrainers = await Trainer.find()
        if (allTrainers.length === 0) {
            return response.status(200).json('No hay Entrenadores Disponibles');
        }
        return response.status(200).json(allTrainers)
    } catch (error) {
        return next(error)
    }
}

export {
    getTrainers
}