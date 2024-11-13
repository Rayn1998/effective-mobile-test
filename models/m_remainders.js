const mongoose = require("mongoose")

const remainder_schema = new mongoose.Schema({
    shop: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        requireq: true,
    },
    plu: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model("remainder", remainder_schema)