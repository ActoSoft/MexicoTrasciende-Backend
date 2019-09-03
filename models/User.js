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
    address: {
        type: String,
        required: false
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
    deletedAt: {
        type: Date,
        required: false
    }
})

module.exports = mongoose.model('User', userSchema)