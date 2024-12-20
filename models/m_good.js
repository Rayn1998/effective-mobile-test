const mongoose = require("mongoose")

const good_schema = new mongoose.Schema({
    plu: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    amount_on_shelf: {
        type: mongoose.Schema.Types.ObjectId, ref: "remainder", required: true
    },
    amount_in_order: {
        type: Number,
        required: true,
    },
    shop: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("good", good_schema)
