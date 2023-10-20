import Pet from '../models/Pet.model.js'
import Parent from '../models/Parent.model.js'
import {validateObjectId} from '../utils/validate/validate.js';

const getPets = async (request, response, next) => {
    try {
        const allPets = await Pet.find().populate('parent')
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

        const pet = await Pet.findById(id).populate('parent')
        if (pet.length === 0) {
            return response.status(200).json(`No hay Mascota con el id: ${id}`);
        }
        response.status(200).json(pet)
    } catch (error) {
        return next(error)
    }
}


const registerPet = async (request, response, next) => {
    const { name, image, birthday, nutrition, diseases, exercice, maxNumberGifts, parent } = request.body
    if (Object.values(request.body).includes('')) {
        const error = new Error('Todos los campos son Obligatorios')
        return response.status(400).json({
            msg: error.message
        })
    }
    const existPet = await Pet.findOne({ name })
    if (existPet) {
        const error = new Error('Ya existe la mascota')
        return response.status(400).json({
            msg: error.message
        })
    }

    const parentPet = await Parent.findOne({email:parent})
    try {
        const newPet = new Pet({
            parent: parentPet,
            name,
            image,
            birthday,
            nutrition,
            diseases,
            exercice,
            maxNumberGifts
        })

        // await sendEmailVerification({
        //     name: newUser.name,
        //     email: newUser.email,
        //     token: newUser.token
        // })
        await newPet.save()
        response.status(200).json({
            msg: 'Mascota Creada correctamente',
            pet: existPet
        })
    } catch (error) {
        console.log(error);
    }
}


export {
    getPets,
    getPet,
    registerPet
}