const app = require('express')()
const cors = require('cors')
const bodyparser = require('body-parser')

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true }))

app.use('/product/api/v1',require('./router/index'))

app.listen(1244,() => {
    console.log('app listening to port 1244')
})
