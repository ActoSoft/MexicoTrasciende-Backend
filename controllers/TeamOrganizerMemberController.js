const TeamOrganizer = require('../models/TeamOrganizerMember')
const moment = require('moment')

class TeamOrganizerController {

    findAll() {
        return TeamOrganizer.find({
            deletedAt: null,
        })
            .then(teamOrganizers => {
                return teamOrganizers
            })
            .catch(error => {
                return {
                    hasError: true,
                    error
                }
            })
    }

    findOne(id) {
        return TeamOrganizer.findOne({ _id: id })
            .then(teamOrganizer => {
                return teamOrganizer
            })
            .catch(error => {
                return {
                    hasError: true,
                    error
                }
            })
    }

    create(body) {
        const newTeamOrganizer = new TeamOrganizer(body)
        return newTeamOrganizer.save()
            .then(teamOrganizer => {
                return {
                    message: 'ok',
                    teamOrganizer
                }
            })
            .catch(error => {
                return {
                    hasError: true,
                    error
                }
            })
    }

    update(id, body) {
        return TeamOrganizer.findByIdAndUpdate(id, body, {
            new: true
        })
            .then(teamOrganizer => {
                return {
                    message: 'ok',
                    teamOrganizer
                }
            })
            .catch(error => {
                return {
                    hasError: true,
                    error
                }
            })
    }

    delete(id) {
        const now = moment().format('YYYY-MM-DD hh:mm:ss')
        return TeamOrganizer.updateOne({ _id: id }, {
            deletedAt: now
        })
            .then(result => {
                return result
            })
            .catch(error => {
                return {
                    hasError: true,
                    error
                }
            })
    }

}

module.exports = new TeamOrganizerController()