const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb) {
        cb(null, file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname))
    }
})

const checkFileType = (file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|webp/
    //Check ext
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    //Check mime
    const mimetype = fileTypes.test(file.mimetype)
    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb('Error: Images Only!')
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 10000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
}).single('image')


module.exports = upload