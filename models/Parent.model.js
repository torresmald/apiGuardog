import mongoose from "mongoose";

const parentSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    name: { type: String, required: true },
    image: String,
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'El email no tiene un formato válido']
    },
    password: { type: String, required: true },
    phone: String,
    address: String
},
    {
        timestamps: true
    });


const Parent = mongoose.model('Parent', parentSchema);

export default Parent;