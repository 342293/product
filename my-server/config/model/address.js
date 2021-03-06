const Sequelize = require('sequelize')
const sequelize = require('../config')

const address = sequelize.define('address', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    company_name: Sequelize.STRING,
    company_detailed: Sequelize.STRING,
    distance: Sequelize.STRING,
    start_time:Sequelize.STRING,
    close_time:Sequelize.STRING,
    longitude:Sequelize.INTEGER,
    latitude:Sequelize.INTEGER
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = address