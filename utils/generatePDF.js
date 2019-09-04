const Promise = require('bluebird')
const pdf = Promise.promisifyAll(require('html-pdf'))
const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const ejsFile = fs.readFileSync(path.join(__dirname, '../views/ticket.ejs'), 'utf8')
const moveFile = require('./moveFile')

const generatePDF = (qrPath, folio) => {

    const options = { height: '1080px',
        width: '1920px',
        filename: `ticket-${folio}.pdf`,
        directory: './public/'
    }
    const context = {
        qrPath,
        folio
    }
    const html = ejs.render(ejsFile, context)
    return pdf.createAsync(html, options)
        .then(pdf => {
            moveFile(pdf.filename)
            const arr = pdf.filename.split('/')
            return `public/tickets/${arr[arr.length - 1]}`
        })
        .catch(error => {
            return {
                hasError: true,
                error
            }
        })
}

module.exports = generatePDF