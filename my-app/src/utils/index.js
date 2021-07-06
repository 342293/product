export function Toast(icon,content){
    wx.showToast({
        icon:icon ? 'none' : '',
        title:content
    })
}

export function openLocation(options){
    Number(options.latitude)
    Number(options.longitude)
    console.log(options)
}