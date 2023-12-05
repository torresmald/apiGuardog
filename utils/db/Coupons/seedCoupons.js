import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';
const MONGO_URL = process.env.MONGO_URL;
import fs from 'fs'
import Coupon from '../../../models/Coupon.model.js'
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const allCoupons = await Coupon.find();
    if (allCoupons.length) {
        await Coupon.collection.drop();
    }
}).catch((error) => {
    console.log(`Ha habido un error al borrar los Coupones ${error}`);
}).then(async () => {
    const data = fs.readFileSync('./utils/db/Coupons/coupons.json');
    const parsedData = JSON.parse(data);
    const coupon = parsedData.map((coupon) => {
        return new Coupon(coupon);
    });
    await Coupon.insertMany(coupon);
    console.log('Coupones añadidos con exito');
}).catch((error) => {
    console.log(`Ha habido un error al añadir los Coupones ${error}`);
}).finally(() => mongoose.disconnect());