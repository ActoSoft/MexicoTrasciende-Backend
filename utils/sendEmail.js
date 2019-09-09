const emailConfig = require('./emailConfig')
const hbs = require('nodemailer-express-handlebars')
const gmailTransport = emailConfig.GmailTransport
const path = require('path')

const sendEmail = (user, pwd) => {
    emailConfig.ViewOption(gmailTransport, hbs)
    const pdfFileNameArray = user.pdfPath.split('/')
    const pdfFileName = pdfFileNameArray[pdfFileNameArray.length - 1]
    const options = {
        from: 'México Trasciende <mxtrasciende2019@gmail.com>',
        to: user.email,
        subject: 'México Trasciende 2019 - Boleto Digital',
        template: 'test',
        context: {
            name: user.name,
            email: user.email,
            password: pwd
        },
        attachments: [
            {
                path: path.join(__dirname, `../public/tickets/${pdfFileName}`)
            }
        ]
    }
    gmailTransport.sendMail(options, (error, info) => {
        if(error) {
            console.log(error)
        } else {
            console.log(info)
            console.log('Email sent')
        }
    })
}

module.exports = sendEmail