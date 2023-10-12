import mongoose from "mongoose";
import { uniqueId } from "../utils/validate/validate.js";

const parentSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    image: String,
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
    email: {
        type: String,
        required: true,
        unique: true,
        trim:  true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'El email no tiene un formato válido']
    },
    password: { type: String, required: true, trim: true},
    phone: {type: String, required: true},
    address: String,
    isAdmin: Boolean,
    verified: Boolean,
    token: {
        type: String,
        default: () => uniqueId()
    },
},
    {
        timestamps: true
    });


const Parent = mongoose.model('Parent', parentSchema);

export default Parent;