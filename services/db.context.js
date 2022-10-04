const dotenv = require('dotenv').config();
const store = require('../models/Store');
const product = require('../models/Product');
const user = require('../models/Users');

// Has Many:
store.hasMany(product, { 
    foreignKey: 'store_id', 
    as: 'product_items' 
});

// Belongs To:
product.belongsTo(store, { 
    foreignKey: 'store_id', 
    as: 'store_info' 
});

module.exports = { store, product, user }