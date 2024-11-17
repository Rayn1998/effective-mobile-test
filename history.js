const express = require('express')
const mongoose = require('mongoose')

const history_router = require('./routes/r_history')

const app = express()

app.use('/', history_router)

mongoose
    .connect("mongodb://127.0.0.1:27017/effective-mobile-test-history")
    .then(
        () => {
            app.listen(3001, () => {
                console.log("History listens to the 3001 port")
            })},
        (err) => {
            console.log(`mongo error: ${err}`)
        }
    )

