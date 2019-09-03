const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
require('dotenv').config()
const secret = process.env.JWT_SECRET || 'defaultSecret'

router.post('/register',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        User.findOne({ email: req.body.email })
            .then(user => {
                if(user) {
                    return res.status(400).json({
                        message: 'El email ya está utilizado'
                    })
                } else {
                    const newUser = new User(req.body)
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) throw err
                        if (!newUser.password)
                            res
                                .status(400)
                                .json({
                                    'message':
                                    'Not password'
                                })
                        bcrypt.hash(newUser.password,
                            salt,
                            (err, hash) => {
                                if (err) {
                                    console.log(err)
                                }
                                newUser.password = hash
                                newUser.save()
                                    .then(user => {
                                        res.json({
                                            user,
                                            message: 'ok'
                                        })
                                    })
                                    .catch(err => {
                                        res.status(400)
                                            .json(err)
                                    })
                            }
                        )
                    })
                }
            })
    })

router.post('/login', (req, res) => {
    const { email, password } = req.body
    User.findOne({ email })
        .then(user => {
            if(!user) {
                return res.status(400)
                    .json({
                        message: 'Usuario no existe'
                    })
            }
            bcrypt.compare(
                password,
                user.password
            ).then(isMatch => {
                if(isMatch) {
                    const payload = {
                        id: user._id,
                        username: user.username
                    }
                    jwt.sign(
                        payload,
                        secret,
                        { expiresIn: 36000 },
                        (err, token) => {
                            if (err) res.status(500)
                            res.json({
                                message: 'ok',
                                token: `Bearer ${token}`,
                                user
                            })
                        }
                    )
                }
                else {
                    res.status(400)
                        .json({
                            message: 'Claves inválidas de acceso'
                        })
                }
            })
        })
})

module.exports = router