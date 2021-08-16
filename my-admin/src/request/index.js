import axios from 'axios'

const http = axios.create({
    baseURL:"https://fhb.5yweb.com/product/api/v1"
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
