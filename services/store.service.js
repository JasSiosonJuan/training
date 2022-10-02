const Response = require('../utils/response.utils');
const Store = require('../models/Store');
const Product = require('../models/Product');
const { AddStoreDTO } = require('../dto/store.dto.service');
const { OK, CREATED, UPDATED, BADREQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/constants.utils');
const { OK_MESSAGE, CREATED_MESSAGE, UPDATED_MESSAGE, BADREQUEST_MESSAGE, INTERNAL_SERVER_ERROR_MESSAGE } = require('../utils/response_message.utils');

class StoreService extends Response {
    // Get All Store:
    async getAllStore () {
        try {
            let exist = await Store.findAll();
            if (exist.length != 0) {
                return this.RESPONSE(OK, exist, OK_MESSAGE);
            } else {
                return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
            }
        } catch (err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

    // Get One Store:
    async getOneStore (requestObject) {
        try {
            let exist = await Store.findOne({ where: { id: requestObject } });
            if (exist != null) {
                return this.RESPONSE(OK, exist, OK_MESSAGE);
            } else {
                return this.RESPONSE(NOTFOUND, {}, "No Record Found!");
            }
        } catch (err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

    // Create Store:
    async createStore (requestObject) {
        try {
            let exist = await Store.findOne({ where: { name: requestObject.name } });
            if (exist == null) {
                let dto = new AddStoreDTO(requestObject);
                let createData = await Store.create(dto);
                if (createData != null) {
                    return this.RESPONSE(OK, createData, "Success");
                } else {
                    return this.RESPONSE(BADREQUEST, {}, "Failed to Create Record!");
                }
            } else {
                return this.RESPONSE(OK, exist, "Already Exists!");
            }
        } catch (err) {
            console.log(err);
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

    //Update Store:
    async updateStore (requestObject) {
        try {
            let exist = await Store.findOne({ where: { id: requestObject.id } });
            if (exist != null) {
                let updateData = await Store.update(requestObject, { where: { id: requestObject.id } });
                if (updateData != null) {
                    let getNewData = await Store.findOne({ where: { id: requestObject.id } });
                    return this.RESPONSE(202, getNewData, "Successfully Updated!");
                } else {
                    return this.RESPONSE(BADREQUEST, {}, "Failed to Update Record!");
                }
            } else {
                return this.RESPONSE(NOTFOUND, {}, "No Record Found!");
            }
        } catch (err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

    //Update Store:
    async deleteStore (requestObject) {
        try {
            let exist = await Store.findOne({ where: { id: requestObject } });
            if (exist != null) {
                let removeData = await Store.destroy({ where: { id: requestObject } });
                if (removeData != null) {
                    return this.RESPONSE(OK, {}, "Successfully Deleted Record!");
                } else {
                    return this.RESPONSE(BADREQUEST, {}, "Failed to Delete Record!");
                }
            } else {
                return this.RESPONSE(NOTFOUND, {}, "No Record Found!");
            }
        } catch (err) {
            return this.RESPONSE(INTERNAL_SERVER_ERROR, {}, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

    //Get All Products By Store
    async getAllProductsByStore () {
        try {
            let exist = await Store.findAll({ include: { model: Product, as: 'product_items' } });
            if (exist.length != 0) {
                return this.RESPONSE(OK, exist, OK_MESSAGE);
            } else {
                return this.RESPONSE(NOTFOUND, [], "No Records Yet!");
            }
        } catch (err) {
            console.log(err);
            return this.RESPONSE(INTERNAL_SERVER_ERROR, err, INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }

}

module.exports = new StoreService;