const express = require('express')
const router = express.Router()
const sponsorController = require('../controllers/SponsorController')
// const upload = require('../utils/fileUpload')
const saveImage = require('../utils/fiileUpload2')

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
    saveImage(req, res, req.body)
        .then(result => {
            sponsorController.create(result)
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
        .catch(error => {
            console.log(error)
            console.log("aqui?")
            return res.status(400).json(error)
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