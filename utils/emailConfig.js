const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports.GmailTransport = nodemailer.createTransport({
    service: process.env.EMAIL_NAME,
    host: process.env.EMAIL_HOST,
    secure: process.env.EMAIL_SECURE,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

module.exports.ViewOption = (transport, hbs) => {
    transport.use('compile', hbs({
        viewEngine: {
            extName: '.hbs',
            partialsDir: 'views/email',
            layoutsDir: 'views/email',
            defaultLayout: 'test.hbs'
        },
        viewPath: 'views/email',
        extName: '.hbs'
    }))
}