const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const Response = require('../utils/response.utils');
const { OK, CREATED, UPDATED, BADREQUEST, NOTFOUND, INTERNAL_SERVER_ERROR } = require('../utils/constants.utils');
const { OK_MESSAGE, CREATED_MESSAGE, UPDATED_MESSAGE, NOTFOUND_MESSAGE, BADREQUEST_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE, BADREQUEST_USER_ALREADY_EXIST } = require('../utils/response_message.utils');
const Users = require('../models/Users');
const AuthService = require('./auth.service');

class UserService extends Response{
    // Login:
    async login (requestObject) {
        try {
            let exist = await Users.findOne({ where: { username: requestObject.username } });
            if (exist != null) {
                let passwordConfirm = await bcrypt.compare(requestObject.password, exist["dataValues"].password);
                if (passwordConfirm == true) {
                    console.log(exist["dataValues"]);
                    let token = await AuthService.auth(exist["dataValues"]);
                    return this.RESPONSE(OK, token.response, OK_MESSAGE);
                } else {
                    return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
                }
            } else {
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
            }
        } catch (err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

    // Sign-up:
    async signup (requestObject) {
        try {
            if (requestObject != null) {
                let exist = await Users.findOne({ where: { username: requestObject.username } });
                if (exist != null) {
                    return this.RESPONSE(BADREQUEST, {}, BADREQUEST_USER_ALREADY_EXIST);
                }
                if (requestObject.password == requestObject.confirmPassword) {
                    let hashPassword = await bcrypt.hash(requestObject.password, 10);
                    let response = await Users.create({ username: requestObject.username, password: hashPassword, is_active: true });

                    if (response != null) {
                        return this.RESPONSE(OK, response, OK_MESSAGE);
                    } else {
                        return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
                    }

                } else {
                    return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
                }
            } else {
                return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
            }
        } catch (err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }
}

module.exports = new UserService;