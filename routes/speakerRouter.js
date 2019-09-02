const express = require('express')
const router = express.Router()
const speakerController = require('../controllers/SpeakerController')

//List speakers
router.get('/', (req, res) => {
    speakerController.findAll()
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
    speakerController.findOne(req.params.id)
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
    const data = req.body
    speakerController.create(data)
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

router.put('/:id', (req, res) => {
    const { params, body } = req
    speakerController.update(params.id, body)
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
    speakerController.delete(req.params.id)
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