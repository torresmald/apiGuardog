import Pet from '../models/Pet.model.js'
import Parent from '../models/Parent.model.js'
import { sendGoogleEmail } from '../config/email/nodemailer.js'

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
            return newPet
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deletePet(id){
        try {
            const pet = await Pet.findByIdAndDelete(id)
            console.log(pet);
            const parent = await Parent.findById(pet.parent)
            console.log(parent);
            const email = parent.email
            if (pet) {
                const message = 'Eliminado con Éxito'
                const mailOptions = {
                  from: 'Guardog Info <infoguardog@gmail.com>',
                  to: email,
                  subject: 'Eliminacion de Mascota',
                  html: `<p>Hola ${parent.name}, tu mascota :</p>${pet.name} ha sido eliminada correctamente` 
              }
              await sendGoogleEmail(mailOptions).then(result => console.log(result)).catch(error => console.log(error))
                return message
              }
        } catch (error) {
            throw new Error(error.message)
        }
    }
}


const petsService = new PetsService()


export default petsService