const User = require('../models/User')
const moment = require('moment')

class UserController {

    findAll() {
        return User.find({
            deletedAt: null
        }, {
            password: 0
        })
            .then(users => {
                return users
            })
            .catch(error => {
                return {
                    hasError: true,
                    error
                }
            })
    }

    find(attribute, value) {
        return User.find({
            deletedAt: null,
            [attribute]: {
                $regex: value,
                $options: 'i'
            }
        }, {
            password: 0
        })
            .then(users => {
                return users
            })
            .catch(error => {
                return {
                    hasError: true,
                    error
                }
            })
    }

    update(id, body) {
        console.log('llego a update')
        return User.findByIdAndUpdate(id, body, {
            fields: { password: 0 },
            new: true
        })
            .then(user => {
                return user
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
        return User.updateOne({ _id: id }, {
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

module.exports = new UserController()