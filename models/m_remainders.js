const mongoose = require("mongoose")

const remainder_schema = new mongoose.Schema({
    quantity: [
        {
            shop: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            }
        }
    ],
    plu: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model("remainder", remainder_schema)