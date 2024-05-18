import mongoose from 'mongoose'


const servicesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    type: {type: String, required: true,  enum: ['paseo', 'cuidados', 'higiene', 'entrenamiento']},
    image: { type: String },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
    petId: { type: String }, 
    hour: {type: String},
    link: {type: String},
    description: {type: String},
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
},
    {
        timestamps: true
    })


const Service = mongoose.model('Service', servicesSchema);

export default Service;