const { Joi } = require('celebrate')

const good_creation_validation = {
    body: Joi.object().keys({
        plu: Joi.number().required(),
        amount: Joi.number().required(),
        shop: Joi.string().required(),
    })
}

module.exports = good_creation_validation