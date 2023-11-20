import { createTransport } from '../config/nodemailer.js'

export const sendNewCita = async ({ date, time }) => {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASSWORD

    )

    await transporter.sendMail({
        from: 'Guardog Admin <admin@guardog.com>',
        to: 'admin@appsalon.com',
        subject: 'Nueva Cita',
        html: `<p>Hola admin, tienes una nueva cita</p> 
                <p>Cita programada el dia ${date} a las ${time} horas</p>`
    })
}

export const sendUpdateCita = async ({ date, time }) => {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASSWORD

    )

    await transporter.sendMail({
        from: 'Guardog Admin <admin@guardog.com>',
        to: 'admin@appsalon.com',
        subject: 'Cita Actualizada',
        html: `<p>Hola admin, un usuario ha modificado una cita</p> 
                <p>La nueva cita será el día ${date} a las ${time} horas</p>`
    })
}

export const sendDeleteCita = async ({ cita}) => {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASSWORD

    )

    await transporter.sendMail({
        from: 'Guardog Admin <admin@guardog.com>',
        to: 'admin@appsalon.com',
        subject: 'Cita Cancelada',
        html: `<p>Hola admin, un usuario ha cancelado una cita</p> 
                <p>La cita era ${cita}</p>`
    })
}