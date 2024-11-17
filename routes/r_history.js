const history = require("express").Router()
const express = require('express')

const {
    get_history
} = require('../controllers/c_history')

history.use(express.json())

history.get('/history', get_history)

module.exports = history