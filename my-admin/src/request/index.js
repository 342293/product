import axios from 'axios'

const http = axios.create({
    baseURL:"http://118.195.191.226:1244/product/api/v1"
})

function request(options){
    return new Promise((resolve, reject) => {
        http({
            ...options
        }).then(h => {
            if(h.data.code == 200){
                resolve(h.data)
            }
        })
    })
}

export default request
