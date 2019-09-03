const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamOrganizerMemberSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    career:{
        type: String,
        required: true
    },

    role:{
        type: String,
        required: true
    },

    facebook:{
        type: String,
        required: false
    },

    twitter:{
        type: String,
        required: false
    },

    instagram:{
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    deletedAt: {
        type: Date,
        required: false
    },
}, {
    timestamps:true
})

module.exports = mongoose.model('TeamOrganizerMember', teamOrganizerMemberSchema)