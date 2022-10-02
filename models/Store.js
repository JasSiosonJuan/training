const Sequelize = require('sequelize');
const config = require('../config/config');

const store = config.define('Store', {
    name: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
});

module.exports = store;