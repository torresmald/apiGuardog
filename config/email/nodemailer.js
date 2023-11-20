import nodemailer from 'nodemailer'
import {google} from 'googleapis'
import dotenv from 'dotenv'
export const createTransport = (host, port, user, pass) => {
    return nodemailer.createTransport({
        host,
        port,
        auth: {
            user,
            pass
        }
    });
}
dotenv.config()

const REDIRECT_URL = process.env.REDIRECT_URL;
const OAUTH_CLIENTID = process.env.OAUTH_CLIENTID
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET
const OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(OAUTH_CLIENTID, OAUTH_CLIENT_SECRET, REDIRECT_URL)
    
oAuth2Client.setCredentials({refresh_token: OAUTH_REFRESH_TOKEN})

export async function sendGoogleEmail(name, email, token) {
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'jonathan.torresmald@gmail.com',
                clientId: OAUTH_CLIENTID,
                clientSecret: OAUTH_CLIENT_SECRET,
                refreshToken: OAUTH_REFRESH_TOKEN,
                accessToken: accessToken
              }
        })

        const mailOptions = {
            from: 'Guardog Admin <admin.guardog@gmail.com>',
            to: email,
            subject: 'Confirma tu cuenta',
            html: '<p>Hola ' + name + ', confirma tu cuenta</p>' +
          '<p>Tu cuenta está casi lista, confírmala en el siguiente enlace</p>' +
          '<a href="' + process.env.FRONT_URL + '/confirm-account/' + token + '">Confirmar cuenta</a>' +
          '<p>Si no creaste esta cuenta, ignora el mensaje</p>'
        }

        const result = await transport.sendMail(mailOptions)
        return result
    } catch (error) {
        return error
    }

}