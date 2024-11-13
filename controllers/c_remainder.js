const mongoose = require("mongoose")

const Remainder = require("../models/m_remainders")

const create_remainder = async (req, res, next) => {
    const { plu } = req.body
    const remainder_data = { ...req.body }

    try {
        const exists = await Remainder.findOne({ plu })
        if (exists) {
            res.status(200).send(exists)
        } else {
            const remainder = await Remainder.create(remainder_data)

            if (remainder) {
                res.status(200).send(remainder)
            } else {
                res.status(500).send("Error, creating new remainder")
            }
        }
    } catch (err) {
        console.log('dwadadwdaa')
    }
}

module.exports = create_remainder