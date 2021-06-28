const router = require('express').Router()
const address = require('../config/model/address')

router.post('/address', async (req,res) => {
    const list = await address.findAll()
    res.json({
        code:200,
        address:list
    })
})

router.post('/get_product', async (req,res) => {
    console.log(123)
})

module.exports = router