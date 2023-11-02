import Service from '../models/Service.model.js'


class ServicesService {

    async getServices() {
        try {
            const services = await Service.find()
            return services
        } catch (error) {
            throw new Error('La coleccion no existe')
        }
    }

    async getService(id) {
        try {
            const service = await Service.findById(id)
            return service
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createService(data) {
        try {
            if (Object.values(data).includes('')) {
                throw new Error('Todos los campos son Obligatorios')
            }
            const newService = new Service(data)
            await newService.save()
            return newService
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateService(id, data) {
        try {
            const service = await Service.findById(id)
            if (!service) {
                throw new Error('No se encuentra el servicio')
            }
            const modifiedService = new Service({ data });
            modifiedService._id = id;
            const updatedService = await Service.findByIdAndUpdate(
                id,
                modifiedService,
                { new: true }
            )
                return updatedService
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteService (id){
        try {
            const service = await Service.findByIdAndDelete(id)
            if (!service) {
                throw new Error('No se encuentra el servicio')
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

}

const servicesService = new ServicesService()


export default servicesService
