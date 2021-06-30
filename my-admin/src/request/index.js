import axios from 'axios'

const http = axios.create({
    baseURL:"http://118.195.191.226:1244/product/api/v1/"
})

function request(params){
    return new Promise((resolve, reject) => {
        http({
            ...params
        }).then(h => {
            resolve(h)
        })
    })
}

export default request