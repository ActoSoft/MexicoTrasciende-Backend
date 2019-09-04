const emailConfig = require('../utils/emailConfig')
const hbs = require('nodemailer-express-handlebars')
const gmailTransport = emailConfig.GmailTransport
const path = require('path')

const sendEmail = (user) => {
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
            email: user.email
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
            console.log("Se envió el email UWU")
            console.log(info)
        }
    })
}

module.exports = sendEmail