const express = require('express')
const router = express.Router()
const sponsorController = require('../controllers/SponsorController')
const upload = require('../utils/fileUpload')

//List sponsors
router.get('/', (req, res) => {
    sponsorController.findAll()
        .then(result => {
            if (result.hasError) {
                return res.status(400).json(result.error)
            }
            return res.json(result)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
})

router.get('/:id', (req, res) => {
    sponsorController.findOne(req.params.id)
        .then(result => {
            if (result.hasError)
                return res.status(400).json(result.error)
            return res.json(result)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
})

router.post('/', (req, res) => {
    let { body } = req
    upload(req, res, (error) => {
        if (error){
            console.log(error)
        } else {
            if (req.file === undefined) {
                console.log('File is empty')
            } else {
                body.image = req.file.path
            }
        }
        sponsorController.create(body)
            .then(result => {
                if (result.hasError) {
                    return res.status(400).json(result.error)
                }
                return res.json(result)
            })
            .catch(error => {
                return res.status(400).json(error)
            })
    })
})

router.put('/:id', (req, res) => {
    const { params, body } = req
    sponsorController.update(params.id, body)
        .then(result => {
            if(result.hasError) {
                return res.status(400).json(result.error)
            }
            return res.json(result)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
})

router.delete('/:id', (req, res) => {
    sponsorController.delete(req.params.id)
        .then(result => {
            if (result.hasError) {
                return res.status(400).json(result.error)
            }
            return res.json(result)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
})

module.exports = router