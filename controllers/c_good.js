const mongoose = require("mongoose")

const Good = require("../models/m_good")

const create_good = async (req, res, next) => {
    const { plu } = req.body;
    const good_data = { ...req.body }
    try {
        const exists = await Good.findOne({ plu })
        if (exists) {
            res.status(200).send(exists)
        } else {
            const good = await Good.create(good_data)

            if (good) {
                res.status(200).send(good)
            } else {
                res.status(500).send("Error, creating new good")
            }
        }
    } catch (err) {
        console.log('dwadaa')
    }
}

module.exports = create_good