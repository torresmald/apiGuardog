import Service from '../models/Service.model.js'
import { validateObjectId, validateService } from '../utils/validate/validate.js'

const getServices = async (request, response) => {
    const services = await Service.find()
    if(!services.length) {
        return validateService('No hay Servicios', response)
    }
    response.status(200).json(services)
}

const getService = async (request, response) => {
    const id = request.params.id
    if(validateObjectId(id, response)) return
    const service = await Service.findById(id)
    if(!service) {
        return validateService('No se encuentra el Servicio', response)
    }
    response.status(200).json(service)
}

const createServices = async (request, response) => {
    if (Object.values(request.body).includes('')) {
        const error = new Error('Todos los campos son Obligatorios')
        return response.status(400).json({
            msg: error.message
        })
    }
    try {
        const newService = new Service(request.body)
        await newService.save()
        response.status(200).json({
            msg: 'El Servicio se creó correctamente',
            service: newService
        })
    } catch (error) {
        console.log(error);
    }
}

const updateService = async (request, response) => {
    const id = request.params.id
    if(validateObjectId(id, response)) return
    const service = await Service.findById(id)
    if(!service) {
        return validateService('No se encuentra el Servicio', response)
    }


    const modifiedService = new Service({ ...request.body });
    modifiedService._id = id;
    const updatedService = await Service.findByIdAndUpdate(
        id,
        modifiedService,
        { new: true }
    )
    return response.status(201).json({
        msg: 'El Servicio se actualizó correctamente',
        service: modifiedService
    })
}

const deleteService = async (request, response) => {
    const id = request.params.id
    if(validateObjectId(id, response)) return
    const service = await Service.findByIdAndDelete(id)
    if(!service) {
        return validateService('No se encuentra el Servicio', response)
    }
    response.status(200).json({
        msg: 'El Servicio se eliminó correctamente'
    })

}
export {
    getServices,
    getService,
    createServices,
    updateService,
    deleteService
}