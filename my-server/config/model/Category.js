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

// const three_level_classification = sequelize.define('three_level_classification', {
//     id: {
//         type: Sequelize.INTEGER(11),
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     title:Sequelize.STRING,
//     three_level_classification_ppid:Sequelize.STRING
// }, {
//     timestamps: false,
//     freezeTableName: true
// })

category.hasMany(secondary_classification,{ as:'children', foreignKey:"secondary_classification_pid",sourceKey:"id"})
// secondary_classification.hasMany(three_level_classification,{foreignKey:"three_level_classification_ppid",sourceKey:"secondary_classification_pid"})

module.exports = {
    category,
    secondary_classification,
    // three_level_classification
}
