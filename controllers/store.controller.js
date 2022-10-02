const StoreService = require('../services/store.service');

class StoreController {
    async getAllStore () {
        let response = await StoreService.getAllStore();
        return response;
    }

    async getOneStore (requestObject) {
        let response = await StoreService.getOneStore(requestObject);
        return response;
    }

    async createStore (requestObject) {
        let response = await StoreService.createStore(requestObject);
        return response;
    }

    async updateStore (requestObject) {
        let response = await StoreService.updateStore(requestObject);
        return response;
    }

    async deleteStore (requestObject) {
        let response = await StoreService.deleteStore(requestObject);
        return response;
    }

    async getAllProductsByStore () {
        let response = await StoreService.getAllProductsByStore();
        return response;
    }
}

module.exports = new StoreController;