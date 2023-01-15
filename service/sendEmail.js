const nodemailer = require('nodemailer');
require('dotenv');

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.sendinblue.com',
            port: 465,
            auth: { 
                user: process.env.USER,
                pass: process.env.PASS,
            }
        })

        await transporter.sendMail({
            from : process.env.USER,
            to: email,
            subject: subject,
            text: text,
        })
        console.log('Email Sent successfully')
    } catch (error) {
        console.log(error, 'Email not sent')
    }
}

module.exports = sendEmail