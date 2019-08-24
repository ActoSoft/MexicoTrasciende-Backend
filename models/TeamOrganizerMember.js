const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamOrganizerMemberSchema = new Schema({
    FullName: {
        type: String,
        required: true
    },

    Photo: {
        type: File,
        required: true
    },

    Career:{
        type: String,
        required: true
    },

    Role:{
        type: String,
        required: true
    },

    Facebook:{
        type: String,
        required: false
    },

    Twitter:{
        type: String,
        required: false
    },

    Instagram:{
        type: String,
        required: false
    }
}, {
    timestamps:true
})

module.exports = mongoose.model('TeamOrganizerMember', teamOrganizerMemberSchema)