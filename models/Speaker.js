const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SpeakerSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    facebookURL: {
        type: String,
        required: false
    },
    twitterURL: {
        type: String,
        required: false
    },
    instagramURL: {
        type: String,
        required: false
    },
    webURL: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        enum: ['Conferencist', 'Workshop', 'Master']
    },
    deletedAt: {
        type: Date,
        required: false
    },
    public: {
        type: Boolean,
        default: false
    }
}, {
    timestamps:true
})

module.exports = mongoose.model('Speaker', SpeakerSchema)