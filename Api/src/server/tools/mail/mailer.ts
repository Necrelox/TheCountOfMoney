import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Transporter } from 'nodemailer';
import emailTempo from './emailTempo.json';

import { MessageError } from '../../enum/messageError';

export class Mailer {

    public static async checkEmailIsTemporary(email: string) {
        if ((emailTempo).includes(email.split('@')[1] as string))
            throw {
                code: 500,
                message: MessageError.EMAIL_IS_TEMPORARY
            };
    }

    public static sendMail(mailOptions: nodemailer.SendMailOptions): Promise<SMTPTransport.SentMessageInfo> {
        const transporter: Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_AUTH_USER,
                pass: process.env.EMAIL_AUTH_PASSWORD
            }
        });
        return transporter.sendMail(mailOptions);
    }
}


