const QRCode = require('qrcode')
require('dotenv').config()
const API_URL = process.env.API_URL || 'http://localhost:3001'

const generate = (userId) => {
    const baseURL = `${API_URL}/assistance/${userId}`
    return QRCode.toDataURL(baseURL)
        .then(res => {
            return res
        })
        .catch(error => {
            return error
        })
}

module.exports = generate