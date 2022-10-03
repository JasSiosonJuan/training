const express = require('express');
const UserRouter = express.Router();
const UserController = require('../controllers/user.controllers');

UserRouter.post('/user-login', async (req, res) => {
    let response = await UserController.login(req.body);
    return res.status(response.status).send(response);
});

UserRouter.post('/user-signup', async (req, res) => {
    let response = await UserController.signup(req.body);
    return res.status(response.status).send(response);
});

module.exports = UserRouter;