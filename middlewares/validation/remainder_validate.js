const { Joi } = require('celebrate')

const remainder_creation_validation = {
    body: Joi.object().keys({
        plu: Joi.number().required(),
        quantity: {
            shop: Joi.string().required(),
            amount: Joi.number().required()
        },
    })
}

const remainder_incr_decr_validation = {
    body: Joi.object().keys({
        plu: Joi.number().required(),
        shop: Joi.string().required(),
        number: Joi.number()
    })
}

module.exports = {
    remainder_creation_validation,
    remainder_incr_decr_validation
}   