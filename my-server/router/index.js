const router = require('express').Router()
const dayJs = require('dayjs')
const Joi = require('joi')
const multer = require('multer')
const address = require('../config/model/address')
const {product,gallery} = require('../config/model/product')
const album = require('../config/model/album')
const {banner,video} = require('../config/model/banner')
const {category,second_Category,three_Category} = require('../config/model/Category')

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
router.post('/product', (req,res) => get_product(req,res))
router.get('/album',(req,res) => get_album(req,res))
router.post('/upload', upload.single('file'),(req,res) => upload_file(req,res))
router.post('/upload_product',(req,res) => upload_product(req,res))
router.delete('/delete_product',(req,res) => delete_product(req,res))
router.get('/banner',(req,res) => get_banner(req,res))
router.post('/Category',(req,res) => get_Category(req,res))
router.delete("/delete_category",(req,res) => delete_category(req,res))
router.post("/update_category",(req,res) => update_category(req,res))
router.post("/upload_category",(req,res) => upload_category(req,res))

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
    const {category_id} = req.body
    let where = new Object()
    if(category_id) where.category_id = category_id
    const list = await product.findAll({
        where,
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
    let send = new Object()
    const body = req.body
    if(Object.keys(body).length <=0){
        const left = await category.findAll({
            attributes:["id","title"]
        })
        const id = left[0].id
        const right = await second_Category.findAll({
            where:{ category_pid:id },
            attributes:["id","title"],
            include:[
                {
                    model:three_Category,
                    attributes:["id","title"],
                    as:"children"
                }
            ]
        })
        send.left = left
        send.right = right
    }else if(body.category_pid){
        const {category_pid} = body
        const category = await second_Category.findAll({
            where:{ category_pid:category_pid },
            attributes:["id","title"],
            include:[
                {
                    model:three_Category,
                    attributes:["id","title"],
                    as:"children"
                }
            ]
        })
        send = category
        }else if(body.general){
        const small_ = await category.findAll({
            attributes:["id","title","type"],
            include:[
                {
                    model:second_Category,
                    attributes:["id","title","type"],
                    as:"children",
                    include:[
                        {
                            model:three_Category,
                            attributes:["id","title","type"],
                            as:"children"
                        }
                    ]
                }
            ]
        })
        send = small_
    }
    res.json({
        code:200,
        Category:send
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
async function delete_category(req,res){
    const body = req.body
    const type = parseInt(body.type)
    switch (type){
        case 1:
            await category.destroy({
                where:{id:body.id}
            })
            break;
        case 2:
            await second_Category.destroy({
                where:{id:body.id}
            })
            break;
        case 3:
            await three_Category.destroy({
                where:{id:body.id}
            })
            break;
    }
    res.json({
        code:200,
        message:"删除成功"
    })
}
async function update_category(req,res){
    const body = req.body
    switch (body.type){
        case 1:
            await category.update({
                title:body.title
            },{where:{id:body.id}})
            break;
        case 2:
            await second_Category.update({
                title:body.title
            },{where:{id:body.id}})
            break;
        case 3:
            await three_Category.update({
                title:body.title
            },{where:{id:body.id}})
            break;
    }
    res.json({
        code:200,
        message:"修改成功"
    })
}
async function upload_category(req,res){
    const body = req.body
    const options = {
        type:Joi.number(),
        id:Joi.number(),
        title:Joi.string().required().error(new Error("分类名称不能为空"))
    }
    try {
        const joi = await Joi.validate(req.body,options)
        switch (joi.type){
            case 1:
                category.create({
                    title:joi.title,
                    type:1
                })
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }catch (e){
        res.json({
            code:2002,
            message:e.message
        })
    }
}

module.exports = router