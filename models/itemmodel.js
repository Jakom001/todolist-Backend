const { required } = require('joi');
const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'title is required'],
        trim: true,
        minLength: [3, 'title must be at least 1 character long']
    },
    completed:{
        type:Boolean,
        default: false
    }
},{
    timestamps: true
});

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;