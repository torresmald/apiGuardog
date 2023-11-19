import { validateObjectId } from '../utils/validate/validate.js';
import parentsService from '../services/parents.services.js';
import { generateJWT } from '../utils/token/generateJWT.js';


const getParents = async (request, response, next) => {
    try {
        const allParents = await parentsService.getParents()
        return response.status(200).json(allParents)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}


const getParent = async (request, response, next) => {
    try {
        const id = request.params.id
        if (validateObjectId(id, response)) return
        const parent = await parentsService.getParent(id)
        return response.status(200).json(parent)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}




const registerParent = async (request, response, next) => {
    try {
        const data = {
            body: request.body,
            image: request.file
        }
        const parent = await parentsService.registerParent(data)
        response.status(200).json(parent)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const loginParent = async (request, response, next) => {
    try {
        const user = await parentsService.loginParent(request.body)
        const token = generateJWT(user._id)
        response.status(200).json({
            user,
            token
        })
    } catch (error) {
        response.status(400).json({ message: error.message })
    }

}

const verifyAccount = async (request, response, next) => {
    try {
        const token = request.params.token;
        const message = await parentsService.verifyAccount(token)
        response.status(200).json(message)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }

}

const forgotPassword = async (request, response, next) => {
    try {
        const message = await parentsService.forgotPasword(request.body)
        response.json(message)
    } catch (error) {
        return next(error)
    }
}

const verifyPasswordResetToken = async (request, response, next) => {
    try {
        const message = await parentsService.verifyPasswordResetToken(request.params)
        response.status(200).json(message)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const updatePassword = async (request, response, next) => {
    const { password } = request.body
    const { token } = request.params
    try {
        const message = await parentsService.updatePassword(token, password)
        response.status(201).json(message)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}


export {
    getParents,
    getParent,
    registerParent,
    loginParent,
    verifyAccount,
    forgotPassword,
    verifyPasswordResetToken,
    updatePassword
}