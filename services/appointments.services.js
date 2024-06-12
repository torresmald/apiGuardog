import Appointment from "../models/Appointment.model.js"
import { parse, formatISO, startOfDay, endOfDay, isValid } from 'date-fns'
import { sendGoogleEmail } from "../config/email/nodemailer.js";
import Parent from "../models/Parent.model.js";
import { createPDF, deletePDF } from "../utils/pdf/createPdf.js";
import { uniqueId } from "../utils/validate/validate.js";
import tmp from 'tmp';
import fs from 'fs';
import path from 'path';


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

  async getAppointment(id) {
    try {
      const appointment = await Appointment.findById(id).populate(['services', 'parent'])
      return appointment
    } catch (error) {
      throw new Error(error.message)

    }
  }
  async getAppointmentsUser(user) {
    try {
      const allAppointmentsParent = await Appointment.find({ parent: user }).populate(['services', 'parent'])
      const allAppointmentsTrainer = await Appointment.find({
        'services': {
          $elemMatch: {
            'trainer': user
          }
        }
      })
        .select('-totalPaidReal -totalPay -discounts')
        .populate(['services'])
      return allAppointmentsParent.length > 0 ? allAppointmentsParent : allAppointmentsTrainer
    } catch (error) {
      throw new Error(error.message)
    }
  }


  async getAppointmentByDay(date) {
    try {
      const newDate = parse(date, 'dd/MM/yyyy', new Date());
      if (!isValid(newDate)) {
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
      const totalAmount = data.reduce((total, appointment) => {
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
            description: serv.description,
            pet: serv.pet,
            date: serv.date,
            hour: serv.hour,
            petId: serv.petId,
            trainer: serv.trainer
          }
        )),
        totalPaidReal: data[0].totalPaidReal,
        totalPay: data[0].totalPay,
        discounts: data[0].discounts
      });
      const savedAppointment = await newAppointment.save();
      const parent = await Parent.findById(savedAppointment.parent)
      const email = parent.email
      const uniqueID = uniqueId()


      const pdfPath = path.resolve('/tmp', `${uniqueID}.pdf`);

      // Crear el PDF en la ruta especificada
       await createPDF(uniqueID, savedAppointment, pdfPath);
      const servicesHtml = savedAppointment.services.map(service => `
          <div>
            <p>Nombre del servicio: ${service.name}</p>
            <p style="font-weight: bold">Precio: ${service.price} €</p>
            <p>Tipo: ${service.type}</p>
            <img style="width: 200px; heigth: 200px" src="${service.image}" alt="Imagen del servicio">
            <p style="font-weight: bold">Fecha: ${service.date}</p>
            <p style="font-weight: bold">Hora: ${service.hour}</p>
          </div>
      `).join('');
      const mailOptions = {
        from: 'Guardog Info <infoguardog@gmail.com>',
        to: email,
        subject: 'Confirmacion de Cita',
        html: `<p>Hola ${parent.name}, aquí tienes los detalles de tu cita:</p>${servicesHtml}` +
          '<p>Gracias por tu confianza</p>',
        attachments: [{
          filename: `${uniqueID}.pdf`,
          path: pdfPath,
          contentType: 'application/pdf'
        }],
      }
      await sendGoogleEmail(mailOptions).then(result => console.log(result)).catch(error => console.log(error))
      // await deletePDF(pdfPath);

      return newAppointment;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteAppointment(id) {
    try {
      const appointment = await Appointment.findByIdAndDelete(id)
      const parent = await Parent.findById(appointment.parent)
      const email = parent.email
      if (appointment) {
        const message = 'Eliminado con Éxito'
        const mailOptions = {
          from: 'Guardog Info <infoguardog@gmail.com>',
          to: email,
          subject: 'Cancelacion de Cita',
          html: `<p>Hola ${parent.name}, tu cita :</p>${appointment._id} ha sido cancelada correctamente` +
            '<p>Gracias por tu aviso</p>'
        }
        await sendGoogleEmail(mailOptions).then(result => console.log(result)).catch(error => console.log(error))
        return message
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

}

const appointmentsService = new AppointmentsService()

export default appointmentsService