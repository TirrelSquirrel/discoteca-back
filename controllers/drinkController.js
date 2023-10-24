const expressAsyncHandler = require('express-async-handler')
const drinkModel = require('../models/drinkModel')

const allDrinks = expressAsyncHandler(async (req, res) => {

})

const newDrink = expressAsyncHandler(async (req, res) => {
    const {name, price, cuantity} = req.body;

    if(!name || !price || !cuantity) {
        res.sendStatus(400);
        throw new Error('No se han rellenado todos los datos')
    }

    /* //! La bebida ya existe
    const drinkExists =  await drinkModel.findOne({name})
    if (drinkExists) {
        res.sendStatus(405)
        throw new Error('La bebida ya existe')
    } */

    const drink = await drinkModel.create({name, price, cuantity});

    if (drink) {
        res.json({
            _id: drink._id,
            name: drink.name,
            price: drink.price,
            cuantity: drink.cuantity
        })
    } else {
        res.sendStatus(400)
        throw new Error('Creacion fallido')
    }
})

module.exports = {allDrinks, newDrink}