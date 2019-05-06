const sequelize = require('../lib/pgbaseConnector');
const Sequelize = require('sequelize');
const  Position = sequelize.define('Position', {
    Name: {
        type: Sequelize.TEXT,
    },
    Level: {
        type: Sequelize.INTEGER,
    }
});

module.exports = Position;
