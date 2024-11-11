const Joi = require('joi')

const itemSchema = Joi.object({
    name: Joi.string()
    .trim()
    .min(3)
    .required()
    .messages({
        'string.empyty': 'name is rewured',
        "string>min": "name must be at leasr 1 character long"
    })

})
// validate fxn for adding/updating item
const validateItem = (data) =>{
    return itemSchema.validate(data, {abortEarly: false});

};

module.exports = {validateItem};
