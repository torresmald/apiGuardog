import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
    date: { type: String, required: true, trim: true },
    service: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Parent'},
    pet: {type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
},
    {
        timestamps: true
    })


const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;