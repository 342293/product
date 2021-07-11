const router = require('express').Router()
const dayJs = require('dayjs')
const Joi = require('joi')
const multer = require('multer')
const address = require('../config/model/address')
const {product,gallery} = require('../config/model/product')
const album = require('../config/model/album')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage: storage })

router.get('/address', (req,res) => get_address(req,res))
router.get('/product', (req,res) => get_product(req,res))
router.get('/album',(req,res) => get_album(req,res))
router.post('/upload', upload.single('file'),(req,res) => upload_file(req,res))
router.post('/upload_product',(req,res) => upload_product(req,res))

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
async function upload_file(req,res){
    const filename = req.file.filename
    await album.create({
        url:filename
    })
    try {
        res.json({
            code:200,
            message:"上传成功"
        })
    }catch (e){}
}
async function upload_product(req,res){
    console.log(req.body)
    const create_time = dayJs().format('HH-MM')
    const gallery_id = Date.now() + "-" + create_time
    const option = {
        content:Joi.string().required().error(new Error('产品描述必填')),
        product_pic:Joi.array().required().error(new Error('产品图片必选')),
        last_time:Joi.string().empty("").default("")
    }
    try {
        const joi = await Joi.validate(req.body,option)
        // await product.create({
        //     content:joi.content,
        //     last_time:joi.last_time,
        //     gallery_id,
        //     create_time
        // })
        // for (let i = 0; i < joi.product_pic.length; i++) {
        //     await gallery.create({
        //         gallery_pid:gallery_id,
        //         url:joi.product_pic[i]
        //     })
        // }
        console.log(joi)
    }catch (e){
        res.json({
            code:404,
            message:e.message
        })
        return;
    }
}

module.exports = router