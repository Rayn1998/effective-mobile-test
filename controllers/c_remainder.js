const Remainder = require("../models/m_remainders")
const History = require("../models/m_history")

const create_remainder = async (req, res) => {
    const { plu } = req.body
    const remainder_data = { ...req.body }

    try {
        const exists = await Remainder.findOne({ plu })
        if (exists) {
            res.status(200).send(exists)
            return
        } else {
            const remainder = await Remainder.create(remainder_data)
            if (remainder) {
                res.status(200).send(remainder)
                try {
                    await History.create({
                        shop_id: req.body.quantity.shop,
                        action: "create remainder",
                        plu,
                        date: new Date().toISOString(),
                    })
                } catch (historyErr) {
                    console.error("Error sending history event:", historyErr.message);
                }
            } else {
                res.status(500).send("Error, creating new remainder")
            }
        }
    } catch (err) {
        res.status(404).send(err)
    }
}

const update_remainder = async (req, res) => {
    const { plu, quantity } = req.body
    let shop_id = ""
    try {
        const remainder = await Remainder.findOne({ plu })

        if (remainder) {
            let exist = remainder.quantity.findIndex(existed_element => {
                return quantity.shop === existed_element.shop 
            })
            if (exist >= 0) {
                remainder.quantity[exist].amount = quantity.amount 
                shop_id = remainder.quantity[exist].shop
            } else {
                remainder.quantity.push(quantity)
                shop_id = quantity.shop
            }
            await remainder.save()
            res.status(200).send(remainder)
            try {
                await History.create({
                    shop_id,
                    action: "update remainder",
                    plu,
                    date: new Date().toISOString(),
                })
            } catch (historyErr) {
                console.error("Error sending history event:", historyErr.message);
            }
        } else {
            res.status(404).send("Error)")
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

const increase_remainder_by_one_or_provided_number = async (req, res) => {
    const { plu, shop, number } = req.body
    let shop_id = ""
    try {
        const remainder = await Remainder.findOne({ plu })
        if (remainder) {
            remainder.quantity.filter(arr_element => {
                if (arr_element.shop === shop) {
                    if (number) {
                        arr_element.amount += number
                    } else {
                        arr_element.amount++
                    }
                    shop_id = arr_element.shop
                }
            })
        } else {
            res.status(400).send("Incorrect data provided")
        }
        await remainder.save()
        res.status(200).send(remainder)
        try {
            await History.create({
                shop_id,
                action: "update remainder amount",
                plu,
                date: new Date().toISOString(),
            })
        } catch (historyErr) {
            console.error("Error sending history event:", historyErr.message);
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

const decrease_remainder_by_one_or_provided_number = async (req, res) => {
    const { plu, shop, number } = req.body
    let shop_id = ""
    try {
        const remainder = await Remainder.findOne({ plu })
        if (remainder) {
            remainder.quantity.filter(arr_element => {
                if (arr_element.shop === shop) {
                    if (number) {
                        arr_element.amount -= number
                    } else {
                        arr_element.amount--
                    }
                    shop_id = arr_element.shop
                }
            })
        } else {
            res.status(400).send("Incorrect data provided")
        }
        await remainder.save()
        res.status(200).send(remainder)
        try {
            await History.create({
                shop_id,
                action: "update remainder amount",
                plu,
                date: new Date().toISOString(),
            })
        } catch (historyErr) {
            console.error("Error sending history event:", historyErr.message);
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

const filter_remainder = async (req, res) => {
    const { plu, shop_id, amount } = req.body
    let filter = {}
    const filter_nums = [];
    if (plu !== undefined) filter.plu = plu
    if (shop_id !== undefined) filter._id = shop_id
    if (amount !== undefined) {
        let numbers = amount.split(",")
        for (let i = 0; i < numbers.length; i++) {
            filter_nums.push(Number(numbers[i]))
        }
    }
    try {
        const remainder = await Remainder.findOne({ ...filter })
        if (remainder) {
            if (filter_nums.length > 0) {
                for (shop of remainder.quantity) {
                    if (shop.amount >= filter_nums[0] && shop.amount <= filter_nums[1]) {
                        res.status(200).send(remainder)
                    } else {
                        res.status(401).send("There is no such remainder")
                    }
                }
            } else {
                res.status(200).send(remainder)
            }
        } else {
            res.status(401).send("There is no such remainder")
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

const filter_remainder_only_by_quantity = async (req, res) => {
    const { amount } = req.body

    if (!amount) {
        res.status(401).send("You should specify the amount \"from\" - \"to\"")
        return
    }

    let filter_nums = amount.split(",").map(num => Number(num))
    if (filter_nums.length !== 2 || isNaN(filter_nums[0]) || isNaN(filter_nums[1])) {
        res.status(401).send("You entered invalid numbers")
        return
    }

    const [minAmount, maxAmount] = filter_nums

    try {
        const remainders = await Remainder.find({ "quantity.amount": { $gte: minAmount, $lte: maxAmount } })

        if (remainders.length === 0) {
            res.status(401).send("There is no such remainder")
        } else {
            res.status(200).send(remainders)
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    create_remainder,
    update_remainder,
    increase_remainder_by_one_or_provided_number,
    decrease_remainder_by_one_or_provided_number,
    filter_remainder,
    filter_remainder_only_by_quantity
}