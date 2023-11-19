import { createTransport } from '../../config/email/nodemailer.js'

export const sendEmailVerification = async ({ name, email, token }) => {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASSWORD

    )

    await transporter.sendMail({
        from: 'Guardog Admin <admin@guardog.com>',
        to: email,
        subject: 'Confirma tu cuenta',
        html: `<p>Hola ${name}, confirma tu cuenta</p> 
                <p>Tu cuenta está casi lista, confirmala en el siguiente enlace</p>
                <a href="${process.env.FRONT_URL}/confirm-account/${token}">Confirmar cuenta</a>
                <p>Si no creaste esta cuenta, ignora el mensaje</p>`
    })
}


export const sendEmailForgotPassword = async ({ name, email, token }) => {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASSWORD

    )

    await transporter.sendMail({
        from: 'Guardog Admin <admin@guardog.com>',
        to: email,
        subject: 'Restablece tu Contraseña',
        html: `<p>Hola ${name}, has solicitado reestablecer tu contraseña</p> 
                <p>Sigue el siguiente enlace para reestablecerla</p>
                <a href="${process.env.FRONT_URL}/forgot-password/${token}">Reestablecer Contraseña</a>
                <p>Si no lo solicitaste, ignora el mensaje</p>`
    })
}