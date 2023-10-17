import express from 'express'
import { getParent, getParents, registerParent, loginParent, verifyAccount, verifyPasswordResetToken, updatePassword, forgotPassword } from '../controllers/parentsController.js'

const parentsRouter = express.Router()

parentsRouter.route('')
    .get(getParents)

parentsRouter.route('/:id')
    .get(getParent)

parentsRouter.route('/register')
    .post(registerParent)

parentsRouter.route('/login')
    .post(loginParent)

parentsRouter.route('/verify/:token')
    .get(verifyAccount)

parentsRouter.route('/forgot-password')
    .post(forgotPassword)

parentsRouter.route('/forgot-password/:token')
    .get(verifyPasswordResetToken)
    .post(updatePassword)



export default parentsRouter