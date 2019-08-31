const express = require('express')
const router = express.Router()
const Speaker = require('../models/Speaker')

//List speakers
router.get('/', (req, res) => {
    Speaker.find()
        .then(speakers => {
            res.json(speakers)
        })
        .catch(error => {
            res.status(400).json(error)
        })
})

module.exports = router