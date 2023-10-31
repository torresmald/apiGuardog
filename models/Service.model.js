import mongoose from 'mongoose'


const servicesSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    type: {type: String, required: true,  enum: ['paseo', 'cuidados', 'higiene', 'entrenamiento']}
},
    {
        timestamps: true
    })


const Service = mongoose.model('Service', servicesSchema);

export default Service;