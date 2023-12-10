import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    services: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            type: {type: String, required: true,  enum: ['paseo', 'cuidados', 'higiene', 'entrenamiento']},
            image: { type: String },
            pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
            petId: { type: String }, 
            date: {type: Date, required: true},
            hour: {type: String}
        }
    ],
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent' },
    amount: Number
},
{
    timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
