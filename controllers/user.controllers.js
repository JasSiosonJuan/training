const UserService = require('../services/user.service');

class UserController {
    async login (requestObject) {
        let response = await UserService.login(requestObject);
        return response;
    }

    async signup (requestObject) {
        let response = await UserService.signup(requestObject);
        return response;
    }
}

module.exports = new UserController;