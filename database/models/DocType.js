const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const  DocType = sequelize.define('DocType', {
    Name: {
        type: Sequelize.TEXT,
    }
});

module.exports = DocType;
