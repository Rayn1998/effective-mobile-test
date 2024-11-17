const mongoose = require('mongoose')

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

module.exports = mongoose.model("history", history_schema)