class AddStoreDTO {
    constructor (requestObject) {
        this.name = requestObject.name || "";
        this.address = requestObject.address || "";
        this.is_active = requestObject.is_active || false;
    }
}

module.exports = { AddStoreDTO }