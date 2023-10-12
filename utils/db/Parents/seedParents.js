import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';
const MONGO_URL = process.env.MONGO_URL;
import fs from 'fs'
import Parent from '../../../models/Parent.model.js'
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const allParents = await Parent.find();

    if (allParents.length) {
        await Parent.collection.drop();
    }
}).catch((error) => {
    console.log(`Ha habido un error al borrar los Parent ${error}`);
}).then(async () => {
    const data = fs.readFileSync('./utils/db/Parents/parents.json');
    const parsedData = JSON.parse(data);
    const ParentsDoc = parsedData.map((parent) => {
        return new Parent(parent);
    });
    await Parent.insertMany(ParentsDoc);
    console.log('Parent añadidos con exito');
}).catch((error) => {
    console.log(`Ha habido un error al añadir los Parent ${error}`);
}).finally(() => mongoose.disconnect());