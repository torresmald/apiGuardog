import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';
const MONGO_URL = process.env.MONGO_URL;
import fs from 'fs'
import Trainer from '../../../models/Trainer.model.js'
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const allTrainers = await Trainer.find();

    if (allTrainers.length) {
        await Trainer.collection.drop();
    }
}).catch((error) => {
    console.log(`Ha habido un error al borrar los Trainer ${error}`);
}).then(async () => {
    const data = fs.readFileSync('./utils/db/Trainers/trainers.json');
    const parsedData = JSON.parse(data);
    const TrainersDoc = parsedData.map((trainer) => {
        return new Trainer(trainer);
    });
    await Trainer.insertMany(TrainersDoc);
    console.log('Trainers añadidos con exito');
}).catch((error) => {
    console.log(`Ha habido un error al añadir los Trainer ${error}`);
}).finally(() => mongoose.disconnect());