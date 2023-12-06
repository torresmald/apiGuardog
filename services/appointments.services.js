import Appointment from "../models/Appointment.model.js"
import {parse, formatISO, startOfDay, endOfDay} from 'date-fns'

class AppointmentsService {

    async getAppointments() {
        try {
            const allAppointments = await Appointment.find().populate(['services', 'parent'])
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
            const allAppointmentsUser = await Appointment.find({ parent: user }).populate(['services', 'parent'])
            if (allAppointmentsUser.length === 0) {
                throw new Error('La colección no existe')
            }
            return allAppointmentsUser
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getAppointmentByDay(date) {
        try {
            const newDate = parse(date, 'dd/MM/yyyy', new Date());
            const isoDate = formatISO(newDate);
            const appointments = await Appointment.find({
                'services.date': {
                    $gte: startOfDay(new Date(isoDate)),
                    $lte: endOfDay(new Date(isoDate))
                }
            });    
            return appointments;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    

    async registerAppointment(data) {
        try {
            const services = data.map(serviceData => serviceData.service);
            const newAppointment = new Appointment({
                parent: data[0].parent, 
                services: services.map((serv) => ({
                    name: serv.name,
                    price: serv.price,
                    type: serv.type,
                    image: serv.image,
                    pet: serv.pet,
                    date: serv.date,
                    petId: serv.petId,
                })),
            });    
            const savedAppointment = await newAppointment.save();
    
            return savedAppointment;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    
}

const appointmentsService = new AppointmentsService()

export default appointmentsService