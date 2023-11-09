const getAppointments = async (request, response, next) => {
    try {
        response.status(200).json('Citas')

    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}


export {
    getAppointments
}