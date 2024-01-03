import appointmentsService from "../services/appointments.services.js"
const getAppointments = async (request, response, next) => {
    try {
        const allAppointments = await appointmentsService.getAppointments()
        response.status(200).json(allAppointments)

    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const getAppointment = async (request, response, next) => {
    try {
        const {id} = request.params
        const appointment = await appointmentsService.getAppointment(id)
        response.status(200).json(appointment)

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

const getAppointmentByDay = async (request, response, next) => {
    try {
        const {date} = request.query;
        const appointment = await appointmentsService.getAppointmentByDay(date)
        return response.status(200).json(appointment)
        
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const registerAppointment = async (request, response, next) => {
    try {
        const appointment = await appointmentsService.registerAppointment(request.body)
        response.status(200).json(appointment)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const deleteAppointment = async (request, response, next) => {
    try {
        const {id} = request.params
        const appointment = await appointmentsService.deleteAppointment(id)
        response.status(200).json(appointment)
    } catch (error) {
        response.status(400).json({ message: error.message })

    }
}


export {
    getAppointments,
    getAppointmentsUser,
    getAppointmentByDay,
    registerAppointment,
    getAppointment,
    deleteAppointment
}