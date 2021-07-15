const Sequelize = require('sequelize')
const sequelize = require('../config')

const product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    content:Sequelize.STRING,
    gallery_id:Sequelize.STRING,
    create_time:Sequelize.STRING,
    last_time:Sequelize.STRING,

}, {
    timestamps: false,
    freezeTableName: true
})

const gallery = sequelize.define('gallery',{
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    gallery_pid:Sequelize.STRING,
    type:Sequelize.STRING,
    url:Sequelize.STRING
},{
    timestamps: false,
    freezeTableName: true
})

product.hasMany(gallery,{foreignKey:"gallery_pid",sourceKey:"gallery_id"})

module.exports = {
    product,
    gallery
}