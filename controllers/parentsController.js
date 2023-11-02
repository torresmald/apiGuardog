import { validateObjectId } from '../utils/validate/validate.js';
import { uniqueId } from "../utils/validate/validate.js";
import parentsService from '../services/parents.services.js';


const getParents = async (request, response, next) => {
    try {
        const allParents = await parentsService.getParents()
        return response.status(200).json(allParents)
    } catch (error) {
        return next(error)
    }
}


const getParent = async (request, response, next) => {
    try {
        const id = request.params.id
        if (validateObjectId(id, response)) return
        const parent = await parentsService.getParent(id)
        return response.status(200).json(parent)
    } catch (error) {
        return next(error)
    }
}




const registerParent = async (request, response, next) => {
    try {
        const parent = await parentsService.registerParent(request.body)
        response.status(200).json(parent)
    } catch (error) {
        return next(error)
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
        return next(error)
    }

}

const verifyAccount = async (request, response, next) => {
    try {
        const token = request.params.token;
        const message = await parentsService.verifyAccount(token)
        response.status(200).json(message)
    } catch (error) {
        return next(error)
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
        return next(error)
    }
}

const updatePassword = async (request, response, next) => {
    const { password } = request.body
    const { token } = request.params


    try {
        const message = await parentsService.updatePassword(password, token)

        response.status(201).json(message)
    } catch (error) {
        return next(error)
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