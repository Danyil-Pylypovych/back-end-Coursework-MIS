const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { mongoose } = require('mongoose')
const passport = require('passport')
const path = require('path')

const config = require('./config/db')
const account = require('./routes/account')

const app = express()

const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./config/passport')(passport)






app.get('/', function(req, res) {
    res.send('Головна сторінка')
})

app.use('/account', account)

app.use('/public', express.static(path.join(__dirname, 'public')))

app.listen(port, function() {
    console.log("Сервер був запущен по порту: " + port)

    mongoose.connect(config.db, /*{ useNewUrlParser: true, useUnifiedTopology: true }*/)

    mongoose.connection.on('connected', function() {
        console.log("Підключення до бд пройшло успішно")
    })

    mongoose.connection.on('error', function(err) {
        console.log("Підключення до бд пройшло не успішно: " + err)
    })
})

