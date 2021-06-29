const app = require('express')()
const bodyparser = require('body-parser')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended:true }))

const router = require('./router/index')

app.use('/product/api/v1',router)

app.listen(1244,() => {
    console.log('app listening to port 1244')
})
