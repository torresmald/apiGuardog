import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    services: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            type: { type: String, required: true },
            image: { type: String },
            pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
            date: { type: Date, required: true },
            petId: { type: String },  // Ajusta según tu modelo Pet
        }
    ],
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent' },
},
{
    timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
