const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
require('dotenv').config()
const secret = process.env.JWT_SECRET || 'defaultSecret'
const emailConfig = require('../utils/emailConfig')
const hbs = require('nodemailer-express-handlebars')
const gmailTransport = emailConfig.GmailTransport
const generateQr = require('../utils/generateQR')
const saveQr = require('../utils/saveQR')
const qrPathStorage = '/public/qrs'

router.post('/register',
    passport.authenticate('jwt', { session: false }), (req, res) => {
        User.findOne({ email: req.body.email })
            .then(user => {
                if(user) return res.status(400).json({
                    message: 'El email ya está utilizado'
                })
                else {
                    const newUser = new User(req.body)
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) throw err
                        if (!newUser.password)
                            res.status(400).json({
                                'message':
                                'Not password'
                            })
                        bcrypt.hash(newUser.password, salt, async (err, hash) => {
                            if (err) console.log(err)
                            newUser.password = hash
                            const qr = await generateQr(newUser._id)
                            const file = saveQr(qr, newUser._id)
                            // eslint-disable-next-line require-atomic-updates
                            newUser.qrCode = `${qrPathStorage}/${file.fileName}`
                            newUser.save()
                                .then(user => {
                                    res.json({
                                        user, message: 'ok'
                                    })
                                })
                                .catch(err => {
                                    res.status(400).json(err)
                                })
                        })
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
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user._id,
                            username: user.username
                        }
                        jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
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

router.get('/email', (req, res) => {
    emailConfig.ViewOption(gmailTransport, hbs)
    const options = {
        from: 'México Trasciende <mxtrasciende2019@gmail.com>',
        to: 'elwwefanreik@gmail.com',
        subject: 'Hello World!',
        template: 'test',
        context: {
            name: 'Martin Melo',
            email: 'elwwefanreik@gmail.com',
            adsress: 'González Ortega #6'
        }
    }
    gmailTransport.sendMail(options, (error, info) => {
        if(error) {
            console.log(error)
            res.status(400).json(error)
        }
        console.log("Se envió el email UWU")
        console.log(info)
        res.json(info)
    })
})

module.exports = router