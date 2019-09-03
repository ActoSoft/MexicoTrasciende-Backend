const base64ToImage = require('base64-to-image')


const saveQR = (base64String, id) => {
    const path = './public/qrs/'
    const options = {
        'fileName': `qr-${id}-${Date.now()}`,
        'type': 'png'
    }
    const result = base64ToImage(base64String, path, options)
    return result
}

module.exports = saveQR