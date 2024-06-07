import  express  from "express";

import appointmentsRouter from "./routes/appointmentsRoutes.routes.js";
import parentsRouter from './routes/parentsRoutes.routes.js'
import petsRouter from "./routes/petsRoutes.routes.js";
import servicesRouter from "./routes/servicesRoutes.routes.js";
import trainersRouter from './routes/trainersRoutes.routes.js'
import couponsRouter from "./routes/couponsRoutes.routes.js";
import transactionsRouter from "./routes/transactionsRoutes.routes.js";
import createError from "../utils/errors/createError.js";

const apiRouter = express.Router()

apiRouter.use('/appointments', appointmentsRouter)
apiRouter.use('/parents', parentsRouter)
apiRouter.use('/pets', petsRouter)
apiRouter.use('/services', servicesRouter)
apiRouter.use('/trainers', trainersRouter)
apiRouter.use('/coupons', couponsRouter)
apiRouter.use('/transactions', transactionsRouter)



apiRouter.get('/', (request, response, next) => {
    response.status(200).send('Bienvenido')
})
apiRouter.use('*', (request, response, next) => {
    next(createError('La ruta no existe', 404));
})

apiRouter.use((error, request, response, next) => {
    return response.status(error.status || 500).json(error.message || 'Unexpected Error')
  });


export default apiRouter