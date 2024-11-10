const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: [2, 'Name must be at least 1 character long']
    },
},{
    timestamps: true
});

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;