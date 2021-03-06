const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
require('dotenv').config()
const secret = process.env.JWT_SECRET || 'defaultSecret'
const generateQr = require('../utils/generateQR')
const saveQr = require('../utils/saveQR')
const API_URL = process.env.API_URL || 'http://localhost:3001'
const qrPathStorage = `${API_URL}/public/qrs`
const generatePDF = require('../utils/generatePDF')
const authController = require('../controllers/AuthController')
const userController = require('../controllers/UserController')
const sendEmail = require('../utils/sendEmail')

router.post('/register',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        User.findOne({ email: req.body.email })
            .then(user => {
                if(user) return res.status(400).json({
                    message: 'El email ya está utilizado'
                })
                else {
                    const newUser = new User(req.body)
                    const realPassword = newUser.password
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
                            newUser.save()
                                .then(async user => {
                                    if (user.role === 'Assistant') {
                                        const actualFolio = await authController.getFolio()
                                        const folio = actualFolio + 1
                                        const qr = await generateQr(newUser._id, folio)
                                        const file = saveQr(qr, newUser._id)
                                        const qrCode = `${qrPathStorage}/${file.fileName}`
                                        const pdfPath = await generatePDF(qrCode, folio)
                                        userController.update(user._id, {
                                            qrCode,
                                            folio,
                                            pdfPath: `${API_URL}/${pdfPath}`
                                        })
                                            .then(userUpdated => {
                                                sendEmail(userUpdated, realPassword)
                                                res.json({
                                                    user: userUpdated,
                                                    message: 'ok'
                                                })
                                            })
                                            .catch(err => {
                                                console.log(err)
                                                res.status(400).json(err)
                                            })
                                    } else {
                                        res.json({
                                            user,
                                            message: 'ok'
                                        })
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
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
                        message: 'El usuario no existe'
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

module.exports = router