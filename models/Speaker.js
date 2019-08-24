const mongoose = require('mongoose')
const Schema = mongoose.Schema

const speaker = new Schema({
    FullName: {
        type: String,
        required: true
    },
    Biography: {
        type: String,
        required: true
    },
    Photo: {
        type: File,
        required: true
    },
    FacebookURL: {
        type: String,
        required: false
    },
    TwitterURL: {
        type: String,
        required: false
    },
    InstagramURL: {
        type: String,
        required: false
    },
    WebURL: {
        type: String,
        required: false
    },
    RoleEnum: {
        type: String,
        required: true
    }
}, {
    timestamps:true
})