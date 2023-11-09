import servicesService from '../services/services.services.js'
import { validateObjectId, validateService } from '../utils/validate/validate.js'

const getServices = async (request, response) => {
    try {
        const services = await servicesService.getServices()
        response.status(200).json(services)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const getService = async (request, response) => {
    try {
        const id = request.params.id
        if (validateObjectId(id, response)) return
        const service = await servicesService.getService(id)
        if (!service) {
            return validateService('No se encuentra el Servicio', response)
        }
        response.status(200).json(service)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const createServices = async (request, response) => {
    try {
        const newService = await servicesService.createService(request.body)
        response.status(200).json(newService)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const updateService = async (request, response) => {
    try {
        const id = request.params.id
        if (validateObjectId(id, response)) return
        const service = await servicesService.updateService(id, request.body)
        return response.status(201).json(service)

    } catch (error) {
        response.status(400).json({ message: error.message })

    }
}

const deleteService = async (request, response) => {
    try {
        const id = request.params.id
        if (validateObjectId(id, response)) return
        const service = await servicesService.deleteService(id)
        response.status(200).json({
            msg: 'El Servicio se eliminó correctamente'
        })

    } catch (error) {
        response.status(400).json({ message: error.message })

    }

}
export {
    getServices,
    getService,
    createServices,
    updateService,
    deleteService
}