import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';
const MONGO_URL = process.env.MONGO_URL;
import fs from 'fs'
import Pet from '../../../models/Pet.model.js'
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const allPets = await Pet.find();

    if (allPets.length) {
        await Pet.collection.drop();
    }
}).catch((error) => {
    console.log(`Ha habido un error al borrar los Pets ${error}`);
}).then(async () => {
    const data = fs.readFileSync('./utils/db/Pets/pets.json');
    const parsedData = JSON.parse(data);
    const PetsDoc = parsedData.map((pet) => {
        return new Pet(pet);
    });
    await Pet.insertMany(PetsDoc);
    console.log('Pets añadidos con exito');
}).catch((error) => {
    console.log(`Ha habido un error al añadir los Pets ${error}`);
}).finally(() => mongoose.disconnect());