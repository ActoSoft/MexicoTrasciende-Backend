const express = require('express')
const router = express.Router()
const sponsorController = require('../controllers/SponsorController')
const saveImage = require('../utils/saveImages')
const passport = require('passport')

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

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
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
                return res.status(400).json(error)
            })
    })

router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { params, body } = req
        saveImage(req, res, body)
            .then(result => {
                sponsorController.update(params.id, result)
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
                console.log(error)
                return res.status(400).json(error)
            })
    })

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
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