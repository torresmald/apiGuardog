import nodemailer from 'nodemailer'
import {google} from 'googleapis'
import dotenv from 'dotenv'
import { Resend } from 'resend';

// export const createTransport = (host, port, user, pass) => {
//     return nodemailer.createTransport({
//         host,
//         port,
//         auth: {
//             user,
//             pass
//         }
//     });
// }
dotenv.config()

const REDIRECT_URL = process.env.REDIRECT_URL;
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET
const OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, REDIRECT_URL)
    
oAuth2Client.setCredentials({refresh_token: OAUTH_REFRESH_TOKEN})

export async function sendGoogleEmail(mailOptions) {
    try {
        //const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'infoguardog@gmail.com',
                clientId: OAUTH_CLIENT_ID,
                clientSecret: OAUTH_CLIENT_SECRET,
                refreshToken: OAUTH_REFRESH_TOKEN,
                // accessToken: accessToken
              }
        })
        const result = await transport.sendMail(mailOptions)
        return result
    } catch (error) {
        return error
    }

}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendResendEmail(mailOptions) {
    try {
        const result = await resend.emails.send(mailOptions);
        return result
    } catch (error) {
       return error
    }
}
