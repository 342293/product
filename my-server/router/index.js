const router = require('express').Router()
const dayJs = require('dayjs')
const address = require('../config/model/address')

router.post('/address', async (req,res) => {
    const time = dayJs().format('HH:mm')
    const list = await address.findAll()
    for (let i = 0; i < list.length; i++) {
        if(time >= list[i].start_time && time <= list[i].close_time){
            list[i].loader = '营业中'
        }else{
            list[i].loader = '打烊了'
        }
    }
    res.json({
        code:200,
        address:list
    })
})

router.post('/get_product', async (req,res) => {
    console.log(123)
})

module.exports = router