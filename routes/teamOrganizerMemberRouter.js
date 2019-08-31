const express = require('express')
const router = express.Router()
const TeamOrganizerMember = require('../models/TeamOrganizerMember')

//List teamOrganizerMembers
router.get('/', (req, res) => {
    TeamOrganizerMember.find()
        .then(teamOrganizerMembers => {
            res.json(teamOrganizerMembers)
        })
        .catch(error => {
            res.status(400).json(error)
        })
})

//find one teamOrganizerMember
router.get('/:id', (req, res) => {
    TeamOrganizerMember.findById(req.params.id)
        .then(teamOrganizerMember => {
            res.json(teamOrganizerMember)
        })
        .catch(error => {
            res.status(400).json(error)
        })
})

module.exports = router