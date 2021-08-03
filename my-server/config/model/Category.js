const Sequelize = require('sequelize')
const sequelize = require('../config')

const category = sequelize.define("category", {
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

const second_Category = sequelize.define("second_category", {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    title:Sequelize.STRING,
    category_pid:Sequelize.STRING
}, {
    timestamps: false,
    freezeTableName: true
})

const three_Category = sequelize.define("three_category", {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    title:Sequelize.STRING,
    category_ppid:Sequelize.STRING
}, {
    timestamps: false,
    freezeTableName: true
})

second_Category.hasMany(three_Category,{as:"child",foreignKey:"category_ppid",sourceKey:"id"})

module.exports = {
    category,
    second_Category,
    three_Category
}
