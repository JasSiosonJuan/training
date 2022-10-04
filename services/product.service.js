const dotenv = require('dotenv').config();
const Response = require('../utils/response.utils');
const { OK, CREATED, UPDATED, BADREQUEST, NOTFOUND, INTERNAL_SERVER_ERROR } = require('../utils/constants.utils');
const { OK_MESSAGE, CREATED_MESSAGE, UPDATED_MESSAGE, NOTFOUND_MESSAGE, BADREQUEST_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE } = require('../utils/response_message.utils');
const Product = require('../models/Product');
const Store = require('../models/Store');

class ProductService extends Response {
    // Get All Store:
    async getAllProductsByStoreID () {
        try {
            let exist = await Store.findAll({ 
                include: { 
                    model: Product, 
                    as: 'product_items', 
                    attributes: { exclude: ['createdAt', 'updatedAt'] } 
                }, attributes: { exclude: ['createdAt', 'updatedAt'] } 
            });

            if (exist.length != 0) {
                return this.RESPONSE(OK, exist, OK_MESSAGE);
            } else {
                return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
            }
        } catch (err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

    // Get Product By ID With Store Info:
    async getProductIDWithStoreInfo (productID) {
        try {
            let exist = await Product.findOne({ where: { id: productID }, include: [{ model: Store, as: 'store_info' }] });
            if (exist != null) {
                return this.RESPONSE(OK, exist, OK_MESSAGE);
            } else {
                return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE);
            }
        } catch (err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

    // Get All Products:
    async getAllProducts (offset, limit, sort, order) {
        try {
            let exist = await Product.findAll({ offset: offset, limit: limit, order: [[sort, order]] });
            if (exist.length != 0) {
                return this.RESPONSE(OK, exist, OK_MESSAGE);
            } else {
                return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
            }
        } catch (err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }
}

module.exports = new ProductService;