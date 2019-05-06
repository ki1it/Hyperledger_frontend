const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const  SignedStatus = sequelize.define('SignedStatus', {
    Name: {
        type: Sequelize.TEXT,
    },
});

module.exports = SignedStatus;
