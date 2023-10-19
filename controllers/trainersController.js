import Trainer from '../models/Trainer.model.js'
import { generateJWT } from '../utils/token/generateJWT.js';


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

const loginTrainers = async (request, response) => {
    const { email, password } = request.body;

    const existTrainer = await Trainer.findOne({ email })
    if (!existTrainer) {
        const error = new Error('El Usuario No existe, Registrate')
        return response.status(400).json({
            msg: error.message
        })
    }
    if (!existTrainer.verified) {
        const error = new Error('No has verificado tu cuenta, revisa tu email')
        return response.status(400).json({
            msg: error.message
        })
    }

    const isValidPassword = await bcrypt.compare(password, existTrainer.password);
    if (!isValidPassword) {
        const error = new Error('El password no es correcto')
        return response.status(403).json({ msg: error.message })
    }

    const token = generateJWT(existTrainer._id)

    response.status(200).json({
        email,
        token,
        msg: 'Logueado correctamente'
    })

}

export {
    getTrainers,
    loginTrainers
}