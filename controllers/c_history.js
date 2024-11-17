const History = require('../models/m_history')

const send_history_action = async (req, res) => {
    const d = new Date()
    const date = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`
    const data = { ...req.body, date }

    await History.create({ ...data })
    // try {
    //     if (history) {
    //         res.status(200).send(`History action added: ${history}`)
    //     } else {
    //         res.status(400).send("History didn't saved... :(")
    //     }
    // } catch (err) {
    //     res.status(500).send(`err: ${err}`)
    // }
}

const get_history = async (req, res) => {
    console.log('here')
    let filter = {}
    for (const [key, value] of Object.entries(req.body)) {
        if (value !== undefined) filter[key] = value
    } 
    
    try {
        const history = await History.find({  })
        if (history) {
            res.status(200).send(history)
        } else {
            res.status(400).send("History didn't found... :(")
        }
    } catch (err) {
        res.status(500).send(`err: ${err}`)
    }
}

module.exports = { 
    send_history_action,
    get_history
}