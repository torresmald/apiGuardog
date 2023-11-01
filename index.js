import express from 'express'
import dotenv from 'dotenv'
import apiRouter from './router/apiRoutes.routes.js';
import { connect } from './utils/db/connect.js';
import cors from 'cors'

const PORT = process.env.PORT || 4000

dotenv.config()

const app = express();

app.use(express.json())

connect()

app.use(cors())

app.use(apiRouter)

// app.use((error, request, response, next) => {
//     return response.status(error.status || 500).json(error.message || 'Unexpected error');
// });


app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
})