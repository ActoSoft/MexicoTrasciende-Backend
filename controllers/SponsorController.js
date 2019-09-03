const Sponsor = require('../models/Sponsor')
const moment = require('moment')

class SponsorController {

    findAll() {
        return Sponsor.find({
            deletedAt: null,
        })
            .then(sponsors => {
                return sponsors
            })
            .catch(error => {
                return {
                    hasError: true,
                    error
                }
            })
    }

    findOne(id) {
        return Sponsor.findOne({ _id: id })
            .then(sponsor => {
                return sponsor
            })
            .catch(error => {
                return {
                    hasError: true,
                    error
                }
            })
    }

    create(body) {
        const newSponsor = new Sponsor(body)
        return newSponsor.save()
            .then(sponsor => {
                return {
                    message: 'ok',
                    sponsor
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
        return Sponsor.findByIdAndUpdate(id, body, {
            new: true
        })
            .then(sponsor => {
                return {
                    message: 'ok',
                    sponsor
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
        return Sponsor.updateOne({ _id: id }, {
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

module.exports = new SponsorController()