require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

//Routes
app.use('/user', require('./routes/UserRouter'))
app.use('/api', require('./routes/CategoryRouter'))
app.use('/api', require('./routes/Upload'))
app.use('/api', require('./routes/ProductRouter'))
app.use('/api', require('./routes/PaymentRouter'))

//MongoDB bağlantı
const URL = process.env.MONGODB_URL
mongoose.connect(URL,{
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('MongoDB Bağlandı...')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Sunucu calisiyor ',PORT)
})
 