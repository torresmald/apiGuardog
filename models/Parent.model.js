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
    isAdmin: {type: Boolean, default: false},
    verified: {type: Boolean, default: false},
    token: {
        type: String,
        default: () => uniqueId()
    },
    conditions: {type: Boolean, default: false},
},
    {
        timestamps: true
    });


const Parent = mongoose.model('Parent', parentSchema);

export default Parent;