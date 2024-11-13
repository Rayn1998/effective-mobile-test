const remainder = require('express').Router()
const { celebrate } = require('celebrate')

const create_remainder = require('../controllers/c_remainder')

const remainder_creation_validation = require('../middlewares/validation/remainder_create_validate')

remainder.get('/', (req, res) => {
    res.status(200).send("here")
})

remainder.post('/', celebrate(remainder_creation_validation), create_remainder)

module.exports = remainder