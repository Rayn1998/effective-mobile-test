const express = require('express')
const { errors } = require('celebrate')

const goods_routes = require('./r_goods')
const remainder_routes = require('./r_remainder')

const router = express.Router()

router.use(express.json())

router.use('/goods', goods_routes)
router.use('/remainder', remainder_routes)

router.use(errors())

module.exports = router;