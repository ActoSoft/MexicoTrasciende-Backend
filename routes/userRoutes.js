const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')

router.get('/', (req, res) => {
    if (!req.query.filter) {
        userController.findAll()
            .then(result => {
                if (result.hasError) {
                    return res.status(400).json(result.error)
                }
                return res.json(result)
            })
            .catch(error => {
                res.status(400).json(error)
            })
    } else {
        const { filter, value } = req.query
        userController.find(filter, value)
            .then(result => {
                if (result.hasError) {
                    return res.status(400).json(result.error)
                }
                return res.json(result)
            })
            .catch(error => {
                res.status(400).json(error)
            })
    }
})

router.delete('/:id', (req, res) => {
    userController.delete(req.params.id)
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