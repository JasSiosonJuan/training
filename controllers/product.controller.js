const ProductService = require('../services/product.service');

class ProductController {
    async getAllProductsByStoreID () {
        let response = await ProductService.getAllProductsByStoreID();
        return response;
    }

    async getProductIDWithStoreInfo (requestObject) {
        let response = await ProductService.getProductIDWithStoreInfo(requestObject);
        return response;
    }

    async getAllProducts (requestObject) {
        let offset = (requestObject.offset != null || requestObject.offset != undefined ? parseInt(requestObject.offset) : 0);
        let limit = (requestObject.limit != null || requestObject.limit != undefined ? parseInt(requestObject.limit) : 5);
        let sort = (requestObject.sort != null || requestObject.sort != undefined ? requestObject.sort :  'id');
        let order = (requestObject.order != null || requestObject.order != undefined ? requestObject.order :  'ASC');
        let response = await ProductService.getAllProducts(offset, limit, sort, order);
        return response;
    }
}

module.exports = new ProductController;