const Sequelize = require('sequelize')
const sequelize = require('../config')

const category = sequelize.define('category', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    title:Sequelize.STRING
}, {
    timestamps: false,
    freezeTableName: true
})

const secondary_classification = sequelize.define('secondary_classification', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    title:Sequelize.STRING,
    secondary_classification_pid:Sequelize.STRING

}, {
    timestamps: false,
    freezeTableName: true
})

category.hasMany(secondary_classification,{ as:'children', foreignKey:"secondary_classification_pid",sourceKey:"id"})

module.exports = {
    category,
    secondary_classification
}
