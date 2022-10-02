const dotenv = require('dotenv').config();
const { Sequelize } = require('sequelize');

const dburl = {
    database: process.env.database,
    username: process.env.username,
    password: process.env.password,
    host: process.env.host,
    port: process.env.config_port,
    dialect: process.env.dialect
}

module.exports = new Sequelize(dburl);