const express = require('express');
const StoreRouter = express.Router();
const StoreController = require('../controllers/store.controller');
const AuthService = require('../services/auth.service');

StoreRouter.get('/get-all-stores', async (req, res) => {
    let authenticate = await AuthService.verify(req.headers['authorization']);
    if (authenticate.status == 200) {
        let response = await StoreController.getAllStore();
        return res.status(response.status).send(response);
    } else {
        return res.status(authenticate.status).send(authenticate);
    }
});

StoreRouter.get('/get-store-by-id/:id', async (req, res) => {
    let authenticate = await AuthService.verify(req.headers['authorization']);
    if (authenticate.status == 200) {
        let response = await StoreController.getOneStore(parseInt(req.params.id));
        return res.status(response.status).send(response); 
    } else {
        return res.status(authenticate.status).send(authenticate);
    }
});

StoreRouter.post('/create-store', async (req, res) => {
    let authenticate = await AuthService.verify(req.headers['authorization']);
    if (authenticate.status == 200) {
        let response = await StoreController.createStore(req.body);
        return res.status(response.status).send(response);
    } else {
        return res.status(authenticate.status).send(authenticate);
    }
});

StoreRouter.put('/update-store', async (req, res) => {
    let response = await StoreController.updateStore(req.body);
    return res.status(response.status).send(response);
});

StoreRouter.delete('/delete-store/:id', async (req, res) => {
    let response = await StoreController.deleteStore(parseInt(req.params.id));
    return res.status(response.status).send(response);
});

StoreRouter.get('/get-all-products-by-store', async (req, res) => {
    let response = await StoreController.getAllProductsByStore();
    return res.status(response.status).send(response);
});

module.exports = StoreRouter;