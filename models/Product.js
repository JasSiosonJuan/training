const Sequelize = require('sequelize');
const config = require('../config/config');
const store = require('./Store');

const products = config.define('Product', {
    name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    price: {
        type: Sequelize.STRING,
        allowNull: true
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: true
    }
});

store.hasMany(products, { 
    foreignKey: 'store_id', 
    as: 'product_items' 
});

module.exports = products;