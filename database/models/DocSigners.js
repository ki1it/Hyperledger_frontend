const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const  DocSigners = sequelize.define('DocSigners', {
    DocumentFK: {
        type: Sequelize.INTEGER,
    },
    UserFK: {
        type: Sequelize.INTEGER,
    },
    SignedFK: {
        type: Sequelize.INTEGER,
    },
    Comment: {
        type: Sequelize.TEXT,
    },
});

module.exports = DocSigners;
