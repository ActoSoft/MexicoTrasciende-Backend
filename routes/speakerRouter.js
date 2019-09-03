const express = require('express')
const router = express.Router()
const speakerController = require('../controllers/SpeakerController')
const saveImage = require('../utils/saveImages')
const passport = require('passport')

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

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        saveImage(req, res, req.body)
            .then(result => {
                speakerController.create(result)
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
                return res.status(400).json(error)
            })
    })

router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { params, body } = req
        saveImage(req, res, body)
            .then(result => {
                speakerController.update(params.id, result)
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
            .catch(error => {
                return res.status(400).json(error)
            })
    })

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
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