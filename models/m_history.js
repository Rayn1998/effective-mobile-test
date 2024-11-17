const mongoose = require('mongoose')

const history_connection = mongoose
    .createConnection("mongodb://127.0.0.1:27017/effective-mobile-test-history")

const history_schema = new mongoose.Schema({
    shop_id: {
        type: String, 
        required: true,
    },
    plu: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
})

const History = history_connection.model("history", history_schema)
module.exports = History