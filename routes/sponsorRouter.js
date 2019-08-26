const express = require('express')
const router = express.Router()
const Sponsor = require('../models/Sponsor')

//LIst Sponsors
router.get('/', (req, res) => {
    Sponsor.find()
        .then(sponsors => {
            res.json(sponsors)
        })
        .catch(error => {
            res.status(400).json(error)
        })
})