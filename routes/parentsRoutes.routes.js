import express from 'express'
import { getParent, getParents } from '../controllers/parentsController.js'

const parentsRouter = express.Router()

parentsRouter.route('')
    .get(getParents)

parentsRouter.route('/:id')
    .get(getParent)



export default parentsRouter