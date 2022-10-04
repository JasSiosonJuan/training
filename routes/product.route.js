const express = require('express');
const ProductRouter = express.Router();
const ProductController = require('../controllers/product.controller');
const AuthService = require('../services/auth.service');

ProductRouter.get('/get-all-products-by-store-id', async (req, res) => {
    let authenticate = await AuthService.verify(req.headers['authorization']);
    if (authenticate.status == 200) {
        let response = await ProductController.getAllProductsByStoreID();
        return res.status(response.status).send(response);
    } else {
        return res.status(authenticate.status).send(authenticate);
    }
});

ProductRouter.get('/get-all-products-by-store/:id', async (req, res) => {
    let response = await ProductController.getProductIDWithStoreInfo(parseInt(req.params.id));
    return res.status(response.status).send(response);
});

ProductRouter.get('/get-all-products', async (req, res) => {
    let response = await ProductController.getAllProducts(req.query);
    return res.status(response.status).send(response);
});


module.exports = ProductRouter;