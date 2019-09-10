const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const bcrypt = require('bcryptjs')

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

router.get('/:id', (req, res) => {
    userController.findOne(req.params.id)
        .then(result => {
            if (result.hasError) {
                return res.status(400).json(result.error)
            }
            return res.json(result)
        })
        .catch(error => {
            res.status(400).json(error)
        })
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

router.post('/changePassword/:id', (req, res) => {
    const { newPassword } = req.body
    const { id } = req.params
    if (newPassword) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err
            bcrypt.hash(newPassword, salt, (err, hashed) => {
                if (err) throw err
                const data = {
                    password: hashed,
                    logged: true
                }
                userController.update(id, data)
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
    }
})

module.exports = router