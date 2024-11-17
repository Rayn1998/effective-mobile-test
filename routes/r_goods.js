const goods = require('express').Router()
const { celebrate } = require('celebrate')

const {
    create_good,
    get_goods,
    get_filtered_goods,
    filter_goods_only_by_amount_in_order,
    update_good_name_or_amount_in_order
} = require('../controllers/c_good')

const good_creation_validation = require('../middlewares/validation/good_validate')

goods.get('/', get_goods)
goods.patch('/', update_good_name_or_amount_in_order)
goods.get('/filter', get_filtered_goods)
goods.get('/filterrng', filter_goods_only_by_amount_in_order)
goods.post('/', celebrate(good_creation_validation), create_good)

module.exports = goods