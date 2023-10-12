import express from 'express'
import dotenv from 'dotenv'

import appointmentsRouter from './routes/appointmentsRoutes.routes.js';
import petsRouter from './routes/petsRoutes.routes.js';
import parentsRouter from './routes/parentsRoutes.routes.js';
import { connect } from './utils/db/connect.js';
import authRouter from './routes/authRoutes.routes.js';



const PORT = process.env.PORT || 4000

dotenv.config()


const app = express();

app.use(express.json())

connect()


app.get('/', (request, response) => {
    response.status(200).json('Bienvenido a mi API Guardog.')
  })


app.use('/pets', petsRouter)  
app.use('/parents', parentsRouter)  
app.use('/users', authRouter)  
app.use('/appointments', appointmentsRouter)




app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
})