const BaseUrl ="http://118.195.191.226:1244/product/api/v1"
let headers = {}
let count = 0
let time = 1000
let timer;


export function request(params){
    clearTimeout(timer)
    wx.showLoading({ mask:true, title:"数据加载中" })
    return new Promise((resolve, reject) => {
        timer = setTimeout(() => {
            // const token = wx.getStorageSync('token')
            // token ? headers.token = token : ''
            // params.header = headers
            params.url = BaseUrl+params.url
            // timer = setInterval(() => {
            //     count +=1
            //     if(count >= 10){
            //         showToast(false,"数据请求超时,请检查网络~")
            //         count = 0
            //         clearInterval(timer)
            //         return ;
            //     }
            // },time)
            wx.request({...params, success: data => {
                    // clearInterval(timer)
                    wx.hideLoading()
                    if(data.data.code == 200){
                        resolve(data.data)
                    }
                }
            })
        },time / 2)
    })
}

