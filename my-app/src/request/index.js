const BaseUrl = 'http://118.195.191.226:1244/product/api/v1'

const { Toast } = require('../utils/index')

export function request(options){
    return new Promise((resolve, reject) => {
        options.url = BaseUrl+options.url
        wx.request({...options,success:h => {
                if(h.data.code == 200){
                    resolve(h.data)
                }else{
                    Toast(true,'服务器发生异常，请联系开发者')
                }
            }})
    })
}