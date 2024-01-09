import Parent from "../models/Parent.model.js"
import bcrypt from 'bcrypt';
import { uniqueId } from "../utils/validate/validate.js";
import { sendResendEmail, sendGoogleEmail } from "../config/email/nodemailer.js";
const frontURL = process.env.FRONT_URL
class ParentsService {

    async getParents() {
        try {
            const allParents = await Parent.find().populate('pets')
            if (allParents.length === 0) {
                throw new Error('La colección no existe')
            }
            return allParents
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getParent(id) {
        try {
            const parent = await Parent.findById(id).populate('pets')
            if (parent.length === 0) {
                throw new Error(`Parent con el id ${id} no encontrado`)
            }
            return parent
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async registerParent(data) {
        try {
            const { body, image } = data
            const { name, email, password, phone, address } = body
            const imageUploaded = image ? image : null;
            const MIN_LENGTH = 8
            if (Object.values(data).includes('')) {
                throw new Error('Todos los campos son Obligatorios')
            }
            const existParent = await Parent.findOne({ email })
            if (existParent) {
                throw new Error('El usuaro ya existe, logueate')
            }
            if (password.length < MIN_LENGTH) {
                throw new Error('El password es demasiado corto')
            }
            if (!name) {
                throw new Error('El nombre es obligatorio')
            }
            if (!phone) {
                return new Error('El telefono es obligatorio')
            }
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
                image: imageUploaded,
                token: uniqueId()
            })
            const result = await newUser.save()

            const mailOptions = {
                from: 'Guardog Info <onboarding@resend.dev>',
                to: email,
                subject: 'Confirma tu cuenta',
                html: '<p>Hola ' + result.name + ', confirma tu cuenta</p>' +
                    '<p>Tu cuenta está casi lista, confírmala en el siguiente enlace</p>' +
                    '<a href="' + frontURL + '/confirm-account/' + result.token + '">Confirmar cuenta</a>' +
                    '<p>Si no creaste esta cuenta, ignora el mensaje</p>'
            }
            await sendGoogleEmail(mailOptions).then(result => console.log(result)).catch(error => console.log(error))
            const message = 'Hemos enviado un email para confirmar la cuenta'
            return message
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async loginParent(data) {
        try {
            const { email, password } = data;
            const existParent = await Parent.findOne({ email })
            if (!existParent) {
                throw new Error('El usuario no existe, registrate')
            }
            if (!existParent.verified) {
                throw new Error('No has verificado tu cuenta, revisa tu email')
            }
            const isValidPassword = await bcrypt.compare(password, existParent.password);
            if (!isValidPassword) {
                throw new Error('El password no es correcto')
            }
            return existParent
        } catch (error) {
            throw new Error(error.message)
        }

    }

    async verifyAccount(data) {
        try {
            const existParent = await Parent.findOne({ token: data })
            if (!existParent) {
                throw new Error('El token no es valido')
            }
            existParent.verified = true
            existParent.token = ''
            await existParent.save()
            const message = 'Usuario confirmado'
            return message
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async forgotPasword(data) {
        try {
            const { email } = data
            const parent = await Parent.findOne({ email })
            if (!parent) {
                throw new Error('El usuario no existe')
            }
            parent.token = uniqueId()
            const result = await parent.save()

            const mailOptions = {
                from: 'Guardog Info <onboarding@resend.dev>',
                to: email,
                subject: 'Restablece tu Contraseña',
                html: '<p>Hola ' + result.name + ', has solicitado reestablecer tu contraseña</p>' +
                    '<p>Sigue el siguiente enlace para reestablecerla</p>' +
                    '<a href="' + frontURL + '/forgot-password/' + result.token + '">Reestablecer Contraseña</a>' +
                    '<p>Si no lo solicitaste, ignora el mensaje</p>'
            }
            await sendResendEmail(mailOptions).then(result => console.log(result)).catch(error => console.log(error))

            const message = 'Hemos enviado un email con las instrucciones'
            return message
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async verifyPasswordResetToken(data) {
        try {
            const { token } = data
            const parent = await Parent.findOne({ token })
            if (!parent) {
                throw new Error('Token no valido')
            }
            const message = 'Token Valido'
            return message
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updatePassword(token, password) {
        try {
            const parent = await Parent.findOne({ token })
            if (!parent) {
                throw new Error('Token no valido')
            }
            const encryptedPassword = await bcrypt.hash(password.toString(), parseInt(10));
            parent.token = ''
            parent.password = encryptedPassword
            await parent.save()
            const message = 'Password modificado'
            return message
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async editDataParent(id, data) {
        try {
            const updatedParent = await Parent.findByIdAndUpdate(
                id,
                { $set: data },
                { new: true }  
            );
            if (updatedParent) {
                const message = 'Datos actualizados'
                return message
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
}


const parentsService = new ParentsService()

export default parentsService