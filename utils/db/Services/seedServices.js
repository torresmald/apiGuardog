import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';
const MONGO_URL = process.env.MONGO_URL;
import fs from 'fs'
import Service from '../../../models/Service.model.js'
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const allServices = await Service.find();

    if (allServices.length) {
        await Service.collection.drop();
    }
}).catch((error) => {
    console.log(`Ha habido un error al borrar los Services ${error}`);
}).then(async () => {
    const data = fs.readFileSync('./utils/db/Services/services.json');
    const parsedData = JSON.parse(data);
    const ServicesDoc = parsedData.map((service) => {
        return new Service(service);
    });
    await Service.insertMany(ServicesDoc);
    console.log('Services añadidos con exito');
}).catch((error) => {
    console.log(`Ha habido un error al añadir los Services ${error}`);
}).finally(() => mongoose.disconnect());