const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const  User = sequelize.define('User', {
    FirstName: {
        type: Sequelize.TEXT,
    },
    SecondName: {
        type: Sequelize.TEXT,
    },
    PositionFK: {
        type: Sequelize.INTEGER,
    },
    Status: {
        type: Sequelize.TEXT,
    },
});

module.exports = User;
