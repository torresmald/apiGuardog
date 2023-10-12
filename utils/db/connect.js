import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const MONGO_URL = process.env.MONGO_URL

export const connect = async () => {
    try {
        const db = await mongoose.connect(MONGO_URL, { useNewUrlParser: true })
        console.log('Conectado a MONGO ATLAS');
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1)
    }

}