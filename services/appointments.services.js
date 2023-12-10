import Appointment from "../models/Appointment.model.js"
import {parse, formatISO, startOfDay, endOfDay, isValid} from 'date-fns'

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
        if(!isValid(newDate)){
          throw new Error('Fecha no Válida')
        }
        const parsedDate = formatISO(newDate)
        const appointments = await Appointment.find({
          'services': {
            $elemMatch: {
              'date': {
                $gte: startOfDay(new Date(parsedDate)),
                $lt: endOfDay(new Date(parsedDate))
              },
            },
          },
        });    
    const servicesWithDate = appointments.map(appointment => {
        return appointment.services.find(service => {
          const serviceDate = new Date(service.date);
          return (
            serviceDate >= startOfDay(new Date(parsedDate)) &&
            serviceDate < endOfDay(new Date(parsedDate))
          );
        });
      }).filter(Boolean);

    return servicesWithDate;
      } catch (error) {
        throw new Error(error.message);
      }
    }
    
      
      
    

    async registerAppointment(data) {
        try {
            const servicesData = data.map(serviceData => serviceData.services);
            const totalAmount = data.reduce((total, appointment) =>   {
                const servicePrice = appointment.services.price; 
                return total + servicePrice
            }
            , 0)
            const newAppointment = new Appointment({
                parent: data[0].parent, 
                services: servicesData.map((serv) => (
                    {
                        name: serv.name,
                        price: serv.price,
                        type: serv.type,
                        image: serv.image,
                        pet: serv.pet,
                        date: serv.date,
                        hour: serv.hour,
                        petId: serv.petId,
                    }
                )),
                amount: totalAmount
            });    
            const savedAppointment = await newAppointment.save();
    
            return newAppointment;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    
}

const appointmentsService = new AppointmentsService()

export default appointmentsService