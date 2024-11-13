const { Joi } = require('celebrate')

const good_creation_validation = {
    body: Joi.object().keys({
        plu: Joi.number().required(),
        name: Joi.string().required(),
        amount_on_shelf: Joi.number().required(),
        amount_in_order: Joi.number().required(),
        shop: Joi.string().required(),
    })
}

module.exports = good_creation_validation