const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SponsorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    web: {
        type: String,
        required: false
    },
    facebook: {
        type: String,
        required: false
    },
    twitter: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Sponsor', SponsorSchema)