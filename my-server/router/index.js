const router = require('express').Router()
const dayJs = require('dayjs')
const multer = require('multer')
const address = require('../config/model/address')
const {product,gallery} = require('../config/model/product')
const album = require('../config/model/album')

router.get('/address', (req,res) => get_address(req,res))
router.get('/product', (req,res) => get_product(req,res))
router.get('/album',(req,res) => get_album(req,res))

async function get_address(req,res){
    const time = dayJs().format('HH:mm')
    const list = await address.findAll()
    for (let i = 0; i < list.length; i++) {
        if(time >= list[i].start_time && time <= list[i].close_time){
            list[i].dataValues.loader = '营业中'
        }else{
            list[i].dataValues.loader = '已打烊'
        }
        list[i].dataValues.time = list[i].start_time+"-"+list[i].close_time + list[i].dataValues.loader
    }
    res.json({
        code:200,
        address:list
    })
}
async function get_product(req,res){
    const list = await product.findAll({
        include:[{
            model:gallery,
            attributes:["url"]
        }]
    })
    res.json({
        code:200,
        product:list
    })
}
async function get_album(req,res){
    const album_list = await album.findAll()
    res.json({
        code:200,
        album_list
    })
}

module.exports = router