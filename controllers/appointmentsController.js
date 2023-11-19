import appointmentsService from "../services/appointments.services.js"
import { validateObjectId } from "../utils/validate/validate.js"

const getAppointments = async (request, response, next) => {
    try {
        const allAppointments = await appointmentsService.getAppointments()
        response.status(200).json(allAppointments)

    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const getAppointmentsUser = async (request, response, next) => {
    try {
        const {user} = request.params
        const allAppointments = await appointmentsService.getAppointmentsUser(user)
        response.status(200).json(allAppointments)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const getAppointment = async (request, response, next) => {
    try {
        const id = request.params.id
        if(validateObjectId(id, response)) return
        const appointment = await appointmentsService.getAppointment(id)
        return response.status(200).json(appointment)
        
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const registerAppointment = async (request, response, next) => {
    try {
        const message = await appointmentsService.registerAppointment(request.body)
        response.status(200).json(message)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}


export {
    getAppointments,
    getAppointmentsUser,
    getAppointment,
    registerAppointment
}