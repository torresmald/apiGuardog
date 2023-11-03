const getAppointments = async (request, response, next) => {
    try {
        response.status(200).json('Citas')

    } catch (error) {
        return next(error)
    }
}


export {
    getAppointments
}