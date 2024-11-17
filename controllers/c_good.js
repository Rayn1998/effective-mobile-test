const Good = require("../models/m_good")
const Remainder = require("../models/m_remainders")
const History = require("../models/m_history")

const create_good = async (req, res) => {
    const { plu, shop } = req.body;
    const good_data = { ...req.body }
    try {
        const exists = await Good.findOne({ plu })
        if (exists) {
            res.status(200).send(exists)
        } else {
            const amount = await Remainder.findOne({ plu })
            if (amount) {
                good_data.amount_on_shelf = amount._id
            } else {
                res.status(404).send("There is no such good in any storage. Create the remainder with this plu first").end()
                return
            }
            const good = await Good.create(good_data)
            if (good) {
                res.status(200).send(good)
                try {
                    await History.create({
                        shop_id: shop,
                        action: "create good",
                        plu,
                        date: new Date().toISOString(),
                    })
                } catch (historyErr) {
                    console.error("Error sending history event:", historyErr.message);
                }
            } else {
                res.status(500).send("Error, creating new good")
            }
        }
    } catch (err) {
        console.log(err)
    }
}

const update_good_name_or_amount_in_order = async (req, res) => {
    const { plu, name, amount_in_order, shop } =  req.body
    let shop_id = ""
    if (shop !== undefined) shop_id = shop

    try {
        const good = await Good.findOne({ plu })

        if (good) {
            good.name = name
            good.amount_in_order = amount_in_order
            shop_id = good.shop
            await good.save()
            res.status(200).send(good)
            try {
                await History.create({
                    shop_id,
                    action: "update good",
                    plu,
                    date: new Date().toISOString(),
                })
            } catch (historyErr) {
                console.error("Error sending history event:", historyErr.message);
            }
            return
        } else {
            res.status(401).send("There is no such good in storage")
        } 
    } catch (err) {
        res.status(500).send(err)
    }
}

const get_goods = async (_, res) => {
    let goods
    try {
        goods = await Good.find({}).populate("amount_on_shelf")
        if (goods) {
            res.status(200).send(goods)
        } else {
            res.status(404).send("Nothing found")
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

const get_filtered_goods = async (req, res) => {
    const { plu, name } = req.body
    let filter = {}
    if (plu !== undefined) filter.plu = plu
    if (name !== undefined) filter.name = name
    try {
        const goods = await Good.find({ ...filter })
        if (goods) {
            res.status(200).send(goods)
        } else {
            res.status(401).send("There is no such good in storage")
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

const filter_goods_only_by_amount_in_order = async (req, res) => {
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
        const goods = await Good.find({ "amount_in_order": { $gte: minAmount, $lte: maxAmount } })

        if (goods.length === 0) {
            res.status(401).send("There is no such good")
        } else {
            res.status(200).send(goods)
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    create_good,
    get_goods,
    get_filtered_goods,
    filter_goods_only_by_amount_in_order,
    update_good_name_or_amount_in_order
}