const { application } = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const user = require('./user')(sequelize, DataTypes);
const AccessSite = require('./AccessSite')(sequelize, DataTypes);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = user;
db.AccessSite = AccessSite;

module.exports = db;
