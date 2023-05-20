const express = require('express');
const {mongoose} = require('mongoose');
const app = express();
require('dotenv').config();
const cors = require('cors');

const {PORT, MONGO_URL} = require("./config/config");
const {mainErrorHandler} = require('./errors');
const {authRouter, userRouter} = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({ origin: 'http://localhost:4200' }));
app.get('/', (req, res) => {
    res.json('There should be some kind of API documentation... try: /auth or /users')
});

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', (req, res, next) => {
    next(new Error('Route not found'))
})
app.use(mainErrorHandler)

app.listen(PORT, () => {
    console.log("Done... running on the port:" + PORT)
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.connection.on("connected", () => {
        console.log("Connected to database success...");
    });
    mongoose.connection.on("error", (err) => {
        console.log("Database connecting error:" + err);
    });
});
