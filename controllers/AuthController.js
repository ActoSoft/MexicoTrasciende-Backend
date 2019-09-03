const User = require('../models/User')

class UserController {

    getFolio() {
        return User.count()
            .then(count => {
                return count
            })
            .catch(error => {
                return error
            })
    }

    updateUser(id, body) {
        return User.findByIdAndUpdate(id, body, {
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


}

module.exports = new UserController()
