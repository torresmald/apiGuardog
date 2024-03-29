import express from 'express'
import { getParent, getParents, registerParent, loginParent, verifyAccount, verifyPasswordResetToken, updatePassword, forgotPassword, editDataParent } from '../../controllers/parentsController.js'
import uploadFile from '../../middlewares/files/files.middleware.js'
import uploadToCloud from '../../middlewares/files/cloudinary.middleware.js'

const parentsRouter = express.Router()

parentsRouter.route('')
    .get(getParents)

parentsRouter.route('/:id')
    .get(getParent)
    .put(editDataParent)

parentsRouter.route('/register')
    .post(uploadFile.single('image'), uploadToCloud, registerParent)

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