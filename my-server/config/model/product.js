const Sequelize = require('sequelize')
const sequelize = require('../config')

const product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    head:Sequelize.STRING,
    username:Sequelize.STRING,
    content:Sequelize.STRING,
    theme_id:Sequelize.STRING,
    create_time:Sequelize.STRING,
    last_time:Sequelize.STRING,

}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = product