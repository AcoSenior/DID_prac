const { application } = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// const user = require('./user')(sequelize, DataTypes);
// const AccessSite = require('./AccessSite')(sequelize, DataTypes);

const AppInfo = require('./models/AppInfo')(sequelize, DataTypes);
const UserInfo = require('./models/UserInfo')(sequelize, DataTypes);
const getUserInfo = require('./models/getUserInfo')(sequelize, DataTypes);
const RedirectURI = require('./models/RedirectURI')(sequelize, DataTypes);
const UserPoint = require('./models/UserPoint')(sequelize, DataTypes);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.AppInfo = AppInfo;
db.UserInfo = UserInfo;
db.getUserInfo = getUserInfo;
db.RedirectURI = RedirectURI;
db.UserPoint = UserPoint;

module.exports = db;
