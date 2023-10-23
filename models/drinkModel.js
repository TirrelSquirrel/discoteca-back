const mongoose = require('mongoose');

const drinkModel = mongoose.Schema({
    name: {type: String},
    price: {type: Number},
    cuantity : {type:Number}
})

const Drink = mongoose.model('Drink', drinkModel)

module.exports = Drink