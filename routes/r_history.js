const history = require("express").Router()
const express = require('express')
const History = require("../models/m_history")

history.use(express.json())

history.get('/', async (req, res) => {
    const { plu, shop_id, action, date } = req.body
    let filter = {}
    let fdates = []
    if (plu !== undefined) filter.plu = plu
    if (shop_id !== undefined) filter.shop_id = shop_id
    if (action !== undefined) filter.action = action
    if (date !== undefined) {
        let dates = date.split(" ")
        if (dates.length == 2) {
            for (let i = 0; i < dates.length; i++) {
                fdates.push(new Date(dates[i]).toISOString())
            }
        } else {
            res.status(401).send("Please, enter the correct date")
            return
        }
    }

    try {
        let history
        if (date) {
            history = await History.find({ ...filter, "date": { $gte: fdates[0], $lte: fdates[1] } })
        } else {
            history = await History.find({ ...filter })
        }
        if (history.length > 0) {
            res.status(200).send(history)
        } else {
            res.status(401).send("There is no such history")
        }
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = history