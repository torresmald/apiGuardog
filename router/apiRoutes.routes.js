import  express  from "express";

import appointmentsRouter from "./routes/appointmentsRoutes.routes.js";
import parentsRouter from './routes/parentsRoutes.routes.js'
import petsRouter from "./routes/petsRoutes.routes.js";
import servicesRouter from "./routes/servicesRoutes.routes.js";
import trainersRouter from './routes/trainersRoutes.routes.js'

const apiRouter = express.Router()

apiRouter.use('/appointments', appointmentsRouter)
apiRouter.use('/parents', parentsRouter)
apiRouter.use('/pets', petsRouter)
apiRouter.use('/services', servicesRouter)
apiRouter.use('/trainers', trainersRouter)


apiRouter.use('/', (request, response, next) => {
    response.status(200).send('Bienvenido')
    next(error);
})
apiRouter.use('*', (request, response, next) => {
    response.status(404).send('La ruta no existe')
    next(error);
})


export default apiRouter