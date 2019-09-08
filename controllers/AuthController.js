const User = require('../models/User')

class AuthController {

    getFolio() {
        return User.count()
            .then(count => {
                return count
            })
            .catch(error => {
                return error
            })
    }
}

module.exports = new AuthController()
