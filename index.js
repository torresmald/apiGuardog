import express from 'express'
import dotenv from 'dotenv'

import appointmentsRouter from './routes/appointmentsRoutes.routes.js';
import petsRouter from './routes/petsRoutes.routes.js';
import parentsRouter from './routes/parentsRoutes.routes.js';
import trainersRouter from './routes/trainersRoutes.routes.js'
import servicesRouter from './routes/servicesRoutes.routes.js';


import { connect } from './utils/db/connect.js';
import cors from 'cors'



const PORT = process.env.PORT || 4000

dotenv.config()


const app = express();

app.use(express.json())

connect()

app.use(cors())

app.get('/', (request, response) => {
    response.status(200).json('Bienvenido a mi API Guardog.')
  })


app.use('/pets', petsRouter)  
app.use('/parents', parentsRouter)  
app.use('/appointments', appointmentsRouter)
app.use('/trainers', trainersRouter)
app.use('/services', servicesRouter)



app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
})