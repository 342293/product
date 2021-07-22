export function Toast(icon,content){
    wx.showToast({
        icon:icon ? 'none' : '',
        title:content
    })
}

export function previewImage(current,list){
    let lists = []
    for (let i = 0; i < list.length; i++) {
        lists.push(list[i].url)
    }
    wx.previewImage({
        current: current,
        urls: lists
    })
}

export function makePhoneCall(content){
    wx.makePhoneCall({
        phoneNumber:content
    })
}

export function openLocation(Object){
    const {latitude,longitude,company_detailed} = Object
    wx.openLocation({
        latitude,
        longitude,
        name:company_detailed,
        title:company_detailed
    })
}

export function JSONParseInt(Object,Array){
    for (const Key in Array) {
        const longitude = parseFloat(Object[Array[Key]])
        Object[Array[Key]] = longitude
    }
    return Object;
}


export function showLoading(content){
    wx.showLoading({
        title:content
    })
}

export function hideLoading(){
    wx.hideLoading()
}