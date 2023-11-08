import Trainer from '../models/Trainer.model.js'
import { generateJWT } from '../utils/token/generateJWT.js';
import bcrypt from 'bcrypt'

class TrainerService {
    async getTrainers() {
        try {
            const allTrainers = await Trainer.find()
            return allTrainers
        } catch (error) {
            throw new Error('La coleccion no existe')
        }
    }

    async getTrainer(id){
        try {
            const trainer = await Trainer.findById(id)
            return trainer
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async loginTrainers({ email, password }) {
        try {
            const existTrainer = await Trainer.findOne({ email })
            if (!existTrainer) {
                throw new Error('El Usuario No existe, Registrate')
            }
            if (!existTrainer.verified) {
                throw new Error('No has verificado tu cuenta, revisa tu email')

            }
            const isValidPassword = await bcrypt.compare(password, existTrainer.password);
            if (!isValidPassword) {
                throw new Error('El password no es correcto')
            }
            return { existTrainer }

        } catch (error) {
            throw new Error(error.message)
        }
    }

    async registerTrainers(data) {
        try {
            const { name, image, experience, email, phone, password } = data
            const MIN_LENGTH = 8
            const existTrainer = await Trainer.findOne({ email })
            if (existTrainer) {
                throw new Error('El Usuario ya existe, Loguéate')
            }
            if (password.length < MIN_LENGTH) {
                throw new Error('El Password es demasiado corto, mínimo 8 carácteres.')
            }
            const encryptedPassword = await bcrypt.hash(password.toString(), parseInt(10));
            if (!encryptedPassword) {
                return next();
            }
            const newUser = new Trainer({
                name,
                image,
                password: encryptedPassword,
                experience,
                email,
                phone,
            })
            await newUser.save()
            return newUser
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

const trainerService = new TrainerService()

export default trainerService