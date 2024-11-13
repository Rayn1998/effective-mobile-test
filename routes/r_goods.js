const goods = require('express').Router()
const { celebrate } = require('celebrate')

const create_good = require('../controllers/c_good')

const good_creation_validation = require('../middlewares/validation/good_create_validate')
goods.get('/', (req, res) => {
    res.status(200).send("here")
})

goods.post('/', celebrate(good_creation_validation), create_good)

module.exports = goods