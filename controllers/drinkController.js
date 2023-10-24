const expressAsyncHandler = require('express-async-handler')
const drink = require('../models/drinkModel')

const allDrinks = expressAsyncHandler(async (req, res) => {
    
})

const newDrink = expressAsyncHandler(async (req, res) => {

})

module.exports = {allDrinks, newDrink}