const { application } = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Auth = require('./Auth')(sequelize, DataTypes);
const userSite = require('./userSite')(sequelize, DataTypes);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Auth = Auth;
db.userSite = userSite;

module.exports = db;
