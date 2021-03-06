const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Masculino', 'Femenino', 'Prefiero no decir'],
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Team', 'Seller', 'Assistant'],
        required: true
    },
    qrCode: {
        type: String,
        required: false
    },
    deletedAt: {
        type: Date,
        required: false
    },
    folio: {
        type: Number,
        required: false
    },
    pdfPath: {
        type: String,
        required: false
    },
    logged: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', userSchema)