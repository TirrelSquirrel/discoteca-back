const mongoose = require('mongoose');

const drinkModel = mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required:true},
    cuantity : {type:Number, required:true}
})

const Drink = mongoose.model('Drink', drinkModel)

module.exports = Drink