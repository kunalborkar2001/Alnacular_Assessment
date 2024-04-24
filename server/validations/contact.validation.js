const Joi = require("joi")


const addSingle = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        phone: Joi.number().required(),
        email: Joi.string().email(),
        tags: Joi.array().items(Joi.string()),
        city: Joi.string(),
        state: Joi.string(),
        country: Joi.string()
    }),
}

const bulkUpload = {
    body: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        phone: Joi.number().required(),
        email: Joi.string().email(),
        tags: Joi.array().items(Joi.string()),
        city: Joi.string(),
        state: Joi.string(),
        country: Joi.string()
    }))
};


module.exports = { addSingle, bulkUpload }