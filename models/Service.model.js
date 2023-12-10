import mongoose from 'mongoose'


const servicesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    type: {type: String, required: true,  enum: ['paseo', 'cuidados', 'higiene', 'entrenamiento']},
    image: { type: String },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
    date: { type: Date, required: true },
    petId: { type: String }, 
    date: {type: Date, required: true},
    hour: {type: String}
},
    {
        timestamps: true
    })


const Service = mongoose.model('Service', servicesSchema);

export default Service;