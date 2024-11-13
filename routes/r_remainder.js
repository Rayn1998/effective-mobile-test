const remainder = require('express').Router()
const { celebrate } = require('celebrate')

// Controllers
const {
    create_remainder,
    update_remainder,
    increase_remainder_by_one_or_provided_number,
    decrease_remainder_by_one_or_provided_number,
    filter_remainder,
    filter_remainder_only_by_quantity
} = require('../controllers/c_remainder')

// Validation
const {
    remainder_creation_validation,
    remainder_incr_decr_validation
} = require('../middlewares/validation/remainder_validate')


// Routes
remainder.get('/', filter_remainder)
remainder.get('/nums', filter_remainder_only_by_quantity)
remainder.post('/', celebrate(remainder_creation_validation), create_remainder)
remainder.patch('/', celebrate(remainder_creation_validation), update_remainder)
remainder.patch('/incr', celebrate(remainder_incr_decr_validation), increase_remainder_by_one_or_provided_number)
remainder.patch('/decr', celebrate(remainder_incr_decr_validation), decrease_remainder_by_one_or_provided_number)

module.exports = remainder