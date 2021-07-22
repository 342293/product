const Sequelize = require('sequelize')
const sequelize = require('../config')

const banner = sequelize.define('banner', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    thume:Sequelize.STRING
}, {
    timestamps: false,
    freezeTableName: true
})

const video = sequelize.define('video', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    video:Sequelize.STRING
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = {
    banner,
    video
}
