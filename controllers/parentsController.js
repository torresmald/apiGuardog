import {validateObjectId} from '../utils/validate/validate.js';
import Parent from "../models/Parent.model.js"
import bcrypt from 'bcrypt';
import { uniqueId } from "../utils/validate/validate.js";
import { generateJWT } from "../utils/token/generateJWT.js";


const getParents = async (request, response, next) => {
    try {
        const allParents = await Parent.find().populate('pets')
        if (allParents.length === 0) {
            return response.status(200).json('No hay Padres Disponibles');
        }
        return response.status(200).json(allParents)
    } catch (error) {
        return next(error)
    }
}


const getParent = async (request, response, next) => {
    try {
        const id = request.params.id
        if (validateObjectId(id, response)) return

        const parent = await Parent.findById(id).populate('pets')
        if (parent.length === 0) {
            return response.status(200).json(`Padre con ${id} no encontrado`);
        }
        return response.status(200).json(parent)
    } catch (error) {
        return next(error)
    }
}




const registerParent = async (request, response, next) => {
    const { name, email, password, phone, address, image } = request.body
    const MIN_LENGTH = 8
    if (Object.values(request.body).includes('')) {
        const error = new Error('Todos los campos son Obligatorios')
        return response.status(400).json({
            msg: error.message
        })
    }
    const existParent = await Parent.findOne({ email })
    if (existParent) {
        const error = new Error('El Usuario ya existe, Loguéate')
        return response.status(400).json({
            msg: error.message
        })
    }
    if (password.length < MIN_LENGTH) {
        const error = new Error('El Password es demasiado corto, mínimo 8 carácteres.')
        return response.status(400).json({
            msg: error.message
        })
    }
    try {
        const encryptedPassword = await bcrypt.hash(password.toString(), parseInt(10));
        if (!encryptedPassword) {
            return next();
        }
        const newUser = new Parent({
            name,
            email,
            password: encryptedPassword,
            phone,
            address,
            image,
            token: uniqueId()
        })

        // await sendEmailVerification({
        //     name: newUser.name,
        //     email: newUser.email,
        //     token: newUser.token
        // })
        await newUser.save()
        response.status(200).json({
            msg: 'Usuario Creado correctamente. Revisa tu email',
            user: newUser
        })
    } catch (error) {
        console.log(error);
    }
}

const loginParent = async (request, response) => {
    const { email, password } = request.body;

    const existParent = await Parent.findOne({ email })
    if (!existParent) {
        const error = new Error('El Usuario No existe, Registrate')
        return response.status(400).json({
            msg: error.message
        })
    }
    if (!existParent.verified) {
        const error = new Error('No has verificado tu cuenta, revisa tu email')
        return response.status(400).json({
            msg: error.message
        })
    }

    const isValidPassword = await bcrypt.compare(password, existParent.password);
    if (!isValidPassword) {
        const error = new Error('El password no es correcto')
        return response.status(403).json({ msg: error.message })
    }

    const token = generateJWT(existParent._id)

    response.status(200).json({
        user: existParent,        
        token,
        msg: 'Logueado correctamente'
    })

}

const verifyAccount = async (request, response) => {
    const token = request.params.token;
    const existParent = await Parent.findOne({ token })
    if (!existParent) {
        const error = new Error('El Token no es váido')
        return response.status(401).json({
            msg: error.message
        })
    }
    try {
        existParent.verified = true
        existParent.token = ''
        await existParent.save()
        response.status(200).json({
            msg: 'Usuario Confirmado Correctamente'
        })
    } catch (error) {
        console.log(error);
    }

}

const forgotPassword = async (request, response) => {
    const { email } = request.body
    const parent = await Parent.findOne({ email })
    if (!parent) {
        const error = new Error('El usuario no existe')
        return response.status(404).json({ msg: error.message })
    }
    try {
        parent.token = uniqueId()
        const result = await parent.save()
        // await sendEmailForgotPassword({
        //     name: result.name,
        //     email: result.email,
        //     token: result.token
        // })
        response.json({
            msg: 'Hemos enviado un email con las instrucciones'
        })
    } catch (error) {
        console.log(error)
    }
}

const verifyPasswordResetToken = async (request, response) => {
    const { token } = request.params

    const parent = await Parent.findOne({ token })
    if (!parent) {
        const error = new Error('Token no Valido')
        return response.status(404).json({
            msg: error.message
        })
    }
    response.status(200).json({
        msg: 'Token Valido'
    })
}

const updatePassword = async (request, response) => {
    const { password } = request.body
    const { token } = request.params
    const parent = await Parent.findOne({ token })
    if (!parent) {
        const error = new Error('Token no Valido')
        return response.status(404).json({
            msg: error.message
        })
    }

    try {
        const encryptedPassword = await bcrypt.hash(password.toString(), parseInt(10));
        parent.token = ''
        parent.password = encryptedPassword
        await parent.save()
        response.status(201).json({
            msg: 'Password Modificado Correctamente'
        })

    } catch (error) {
        console.log(error);
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