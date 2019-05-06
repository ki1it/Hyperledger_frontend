const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const Document = sequelize.define('Document', {
    Name: {
        type: Sequelize.TEXT,
    },
    Date: {
        type: Sequelize.DATE,
    },
    Number: {
        unique: true,
        type: Sequelize.INTEGER,
    },
    Text: {
        type: Sequelize.TEXT,
    },
    TypeFK: {
        type: Sequelize.INTEGER,
    },
    AuthorFK: {
        type: Sequelize.INTEGER,
    },
});

module.exports = Document;
