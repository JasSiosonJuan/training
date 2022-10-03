const Sequelize = require('sequelize');
const config = require('../config/config');

const user = config.define('User', {
    username: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
});

module.exports = user;