import { MailAdapter, SendEmailData } from "../email-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'fb1f4a04530e7c',
        pass: '8b31c1cf8c2bf4'
    }
})

 export class NodeMailerAdapter implements MailAdapter {
     async sendEmail ({body,subject}: SendEmailData) {
         await transport.sendMail({
        from:'Equipe Feedget <oi@Feedget.com>',
        to:'Marcos Cruz <marcoscruz673@gmail.com>',
        subject:subject,
        html:body
    })
     }
 }