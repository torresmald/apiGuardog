import Pet from '../models/Pet.model.js'
import Parent from '../models/Parent.model.js'

class PetsService {

    async getPets() {
        try {
            const allPets = await Pet.find().populate('parent')
            if (allPets.length === 0) {
                throw new Error('No hay mascotas Disponibles')
            }
            return allPets
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getPet(id) {
        try {
            const pet = await Pet.findById(id).populate('parent')
            if (pet.length === 0) {
                throw new Error(`No hay mascota con id ${id}`)
            }
            return pet
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async registerPet(data) {
        try {
            const { body, image } = data
            const {name, parent, birthday, nutrition, diseases, exercice, maxNumberGifts} = body
            const imageUploaded = image ? image : null;
            const existPet = await Pet.findOne({ name })
            if (existPet) {
                throw new Error('Ya existe la mascota')
            }
            console.log(parent);
            const parentPet = await Parent.findById(parent)
            const newPet = new Pet({
                parent: parentPet,
                name,
                image: imageUploaded,
                birthday,
                nutrition,
                diseases,
                exercice,
                maxNumberGifts
            })
            await newPet.save()
            // await sendEmailVerification({
            //     name: newUser.name,
            //     email: newUser.email,
            //     token: newUser.token
            // })
            return newPet
        } catch (error) {
            throw new Error(error.message)
        }
    }
}


const petsService = new PetsService()


export default petsService