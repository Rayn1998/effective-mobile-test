const express = require("express")
const mongoose = require('mongoose')

const router = require('./routes')

const app = express()

app.use('/', router)

mongoose
    .connect("mongodb://127.0.0.1:27017/effective-mobile-test")
    .then(
        () =>
            app.listen(3000, () => {
                console.log("App listens to the 3000 port")
            }),
        (err) => {
            console.log('mongo error')
        },
    );