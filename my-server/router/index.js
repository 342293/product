const router = require('express').Router()
const dayJs = require('dayjs')
const address = require('../config/model/address')
const product = require('../config/model/product')

router.post('/address', async (req,res) => {
    console.log(req.body)
    const time = dayJs().format('HH:mm')
    const list = await address.findAll()
    for (let i = 0; i < list.length; i++) {
        if(time >= list[i].start_time && time <= list[i].close_time){
            list[i].loader = '营业中'
        }else{
            list[i].loader = '已打烊'
        }
        list[i].dataValues.time = list[i].start_time+"-"+list[i].close_time + list[i].loader
    }
    res.json({
        code:200,
        address:list
    })
})

router.post('/get_product', async (req,res) => {
    const list = await product.findAll()
    res.json({
        code:200,
        product:list
    })
})

module.exports = router