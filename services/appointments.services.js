import Appointment from "../models/Appointment.model.js"
import Service from "../models/Service.model.js"

class AppointmentsService {

    async getAppointments() {
        try {
            const allAppointments = await Appointment.find().populate(['service', 'parent', 'pet'])
            if (allAppointments.length === 0) {
                throw new Error('La colección no existe')
            }
            return allAppointments
        } catch (error) {
            throw new Error(error.message)
        }
    }
    async getAppointmentsUser(user) {
        try {
            const allAppointmentsUser = await Appointment.find({ parent: user }).populate(['service', 'parent', 'pet'])
            if (allAppointmentsUser.length === 0) {
                throw new Error('La colección no existe')
            }
            return allAppointmentsUser
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getAppointment(id) {
        try {
            const appointment = await Appointment.findById(id).populate(['service', 'parent', 'pet'])
            if (appointment.length === 0) {
                throw new Error(`Cita con el id ${id} no existe`)
            }
            return appointment
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async registerAppointment(data) {
        try {
            for (const cita of data.citas) {
                const previousAppointment = await Appointment.findOne({ date: cita.date });    
                if (previousAppointment) {
                    const previousDate = new Date(previousAppointment.date).toISOString();
                    const currentDate = new Date(cita.date).toISOString();
    
                    if (previousDate === currentDate) {
                        throw new Error('Ya hay una cita reservada ese dia');
                    }
                }
                const newAppointment = new Appointment(cita);
                await newAppointment.save();
            }
    
            return 'Guardado con éxito';
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

const appointmentsService = new AppointmentsService()

export default appointmentsService