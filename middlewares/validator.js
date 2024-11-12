const Joi = require('joi')

const itemSchema = Joi.object({
    title: Joi.string()
    .trim()
    .min(3)
    .required()
    .messages({
        'string.empyty': 'title is rewured',
        "string>min": "title must be at leasr 1 character long"
    }),
    

})
// validate fxn for adding/updating item
const validateItem = (data) =>{
    return itemSchema.validate(data, {abortEarly: false});

};

module.exports = {validateItem};
