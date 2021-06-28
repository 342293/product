const Sequelize = require('sequelize')
const sequelize = require('../config')

const product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    content:Sequelize.STRING,
    create_time:Sequelize.STRING,
    last_time:Sequelize.STRING,
    thume_id:Sequelize.STRING
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = product