const Speaker = require('../models/Speaker')
const moment = require('moment')

class SpeakerControler {
    findAll() {
        return Speaker.find({
            deletedAt: null,
            public: true
        })
            .then(speakers => {
                return speakers
            })
            .catch(error => {
                return {
                    hasError: true,
                    error
                }
            })
    }

    findOne(id) {
        return Speaker.findOne({ _id: id })
            .then(speaker => {
                return speaker
            })
            .catch(error => {
                return {
                    hasError: true,
                    error
                }
            })
    }

    create(body) {
        const newSpeaker = new Speaker(body)
        return newSpeaker.save()
            .then(speaker => {
                return {
                    message: 'ok',
                    speaker
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
        return Speaker.findByIdAndUpdate(id, body, {
            new: true
        })
            .then(speaker => {
                return {
                    message: 'ok',
                    speaker
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
        return Speaker.updateOne({ _id: id }, {
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

module.exports = new SpeakerControler()