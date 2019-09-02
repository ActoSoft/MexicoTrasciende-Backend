const upload = require('./fileUpload')

const saveImage = async(req, res, body) => {
    return new Promise((resolve, reject) => {
        upload(req, res, (error) => {
            if (error) reject(error)
            else {
                if (req.file === undefined) {
                    resolve(body)
                }
                else {
                    body.image = req.file.path
                    resolve(body)
                }
            }
            resolve(body)
        })
    })
}

module.exports = saveImage