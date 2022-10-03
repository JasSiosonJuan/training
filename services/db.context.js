const dotenv = require('dotenv').config();
const store = require('../models/Store');
const product = require('../models/Product');
const user = require('../models/Users');

module.exports = { store, product, user }