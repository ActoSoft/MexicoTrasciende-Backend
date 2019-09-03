const pdf = require('html-pdf')
const fs = require('fs')
const ejs = require('ejs')
const ejsFile = fs.readFileSync('../views/ticket.ejs', 'utf8')
const options = { height: '1080px', width: '1920px' }
const generatePDF = (qrPath, folio = '') => {
    const context = {
        qrPath,
        folio
    }
    const html = ejs.render(ejsFile, context)
    pdf.create(html, options).toFile('./digital-ticket.pdf', (err, res) => {
        if(err) return console.log(err)
        console.log(res)
    })
}

generatePDF('http://localhost:3001/public/qrs/qr-5d6deae61ab34225a0c5cccc-1567484647091.png')