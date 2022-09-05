const express = require('express');
const user = require('./user');
const application = require('./application/application.js');
const route = express.Router();

route.use('/Oauth', user);
route.use('/appl', application);

module.exports = route;
