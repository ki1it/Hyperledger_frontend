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
    }
});

module.exports = UserLogin;
