const router = require('express').Router()
const dayJs = require('dayjs')
const Joi = require('joi')
const multer = require('multer')
const address = require('../config/model/address')
const {product,gallery} = require('../config/model/product')
const album = require('../config/model/album')
const {banner,video} = require('../config/model/banner')
const {category,secondary_classification} = require('../config/model/Category')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
})
const upload = multer({ storage: storage })

router.get('/address', (req,res) => get_address(req,res))
router.get('/product', (req,res) => get_product(req,res))
router.get('/album',(req,res) => get_album(req,res))
router.post('/upload', upload.single('file'),(req,res) => upload_file(req,res))
router.post('/upload_product',(req,res) => upload_product(req,res))
router.delete('/delete_product',(req,res) => delete_product(req,res))
router.get('/banner',(req,res) => get_banner(req,res))
router.get('/Category',(req,res) => get_Category(req,res))

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
        attributes:['id','content','create_time'],
        order:[['id','DESC']],
        include:[{
            model:gallery,
            attributes:["url","type"]
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
    const option = {
        content:Joi.string().required().error(new Error('产品描述必填')),
        product_pic:Joi.array().required().error(new Error('产品图片必选'))
    }
    try {
        const joi = await Joi.validate(req.body,option)
        const create_time = dayJs().format('MM-DD')
        const gallery_id = Date.now() + "-" + create_time
        await product.create({
            content:joi.content,
            gallery_id,
            create_time
        })
        for (let i = 0; i < joi.product_pic.length; i++) {
            let res;
            let type = joi.product_pic[i].url.lastIndexOf(".")
            const result = joi.product_pic[i].url.substr(type+1)
            result == "mp4" || result == "MP4" ? res = 2 : res = 1
            await gallery.create({
                type:res,
                gallery_pid:gallery_id,
                url:joi.product_pic[i].url
            })
        }
        try {
            res.json({
                code:200,
                message:"产品已成功发布"
            })
            return;
        }catch (e){}
    }catch (e){
        res.json({
            code:404,
            message:e.message
        })
        return;
    }
}
async function delete_product(req,res){
    const {id} = req.body
    for (let i = 0; i < id.length; i++) {
        product.destroy({
            where:{id:id[i]}
        })
    }
    res.json({
        code:200,
        message:"选中列删除成功"
    })
    return;
}
async function get_banner(req,res){
    const banner_list = await banner.findAll()
    const video_list = await video.findAll()
    res.json({
        code:200,
        banner_list,
        video_list
    })
}
async function get_Category(req,res){
    const list = await category.findAll({
        include:[{
            model:secondary_classification,
            attributes:["id","title"],
            as:"children"
        }]
    })
    res.json({
        code:200,
        Category:list
    })
}

module.exports = router