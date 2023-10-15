import mongoose from "mongoose";

const trainersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String,
    experience: {type: String, enum: ["1 year", "2 years", "3 years", "4+ years"]},
    email: {
        type: String,
        required: true,
        unique: true,
        trim:  true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'El email no tiene un formato válido']
    },
    phone: {type: String, required: true},
},
{
    timestamps: true
});


const Trainer = mongoose.model('Trainer', trainersSchema);

export default Trainer;