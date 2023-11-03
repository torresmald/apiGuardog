import express from 'express'
import { getServices, createServices, getService, updateService, deleteService } from '../../controllers/servicesController.js'

const servicesRouter = express.Router()

servicesRouter.route('/')
    .get(getServices)

servicesRouter.route('/register')
    .post(createServices)


servicesRouter.route('/:id')
    .get(getService)
    .put(updateService)
    .delete(deleteService)



export default servicesRouter