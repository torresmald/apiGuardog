import express from 'express'
import { forgotPassword, loginUser, registerUser, updatePassword, verifyAccount, verifyPasswordResetToken } from '../controllers/authController.js';


const authRouter = express.Router()

authRouter.route('/register')
    .post(registerUser)

authRouter.route('/login')
    .post(loginUser)

authRouter.post('/forgot-password', forgotPassword)
authRouter.route('/forgot-password/:token')
    .get(verifyPasswordResetToken)
    .post(updatePassword)

authRouter.get('/verify/:token', verifyAccount)



export default authRouter;