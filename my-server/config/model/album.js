const Sequelize = require('sequelize')
const sequelize = require('../config')

const album = sequelize.define('album', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    url:Sequelize.STRING
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = album