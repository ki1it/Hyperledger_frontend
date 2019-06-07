const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const  UserLogin = sequelize.define('UserLogin', {
    Email: {
        type: Sequelize.TEXT,
    },
    Login: {
        type: Sequelize.TEXT,
    },
    Password: {
        type: Sequelize.TEXT,
    },
    UserFK:{
        type: Sequelize.INTEGER,
    },
    Photo: {
        type: Sequelize.TEXT,
    },
    Role: {
        type: Sequelize.TEXT,
    },
    University: {
        type: Sequelize.TEXT,
    }
});

module.exports = UserLogin;
