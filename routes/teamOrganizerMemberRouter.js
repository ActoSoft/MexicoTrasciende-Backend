const express = require('express')
const router = express.Router()
const teamOrganizerMemberController = require('../controllers/TeamOrganizerMemberController')
const saveImage = require('../utils/saveImages')
const passport = require('passport')

//List speakers
router.get('/', (req, res) => {
    teamOrganizerMemberController.findAll()
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
    teamOrganizerMemberController.findOne(req.params.id)
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
                teamOrganizerMemberController.create(result)
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
                teamOrganizerMemberController.update(params.id, result)
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
        teamOrganizerMemberController.delete(req.params.id)
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