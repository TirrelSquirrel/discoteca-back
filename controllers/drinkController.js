const expressAsyncHandler = require("express-async-handler");
const drinkModel = require("../models/drinkModel");

const allDrinks = expressAsyncHandler(async (req, res) => {
  try {
    const drinkList = await drinkModel.find();
    res.json(drinkList);
  } catch (error) {
    res.sendStatus(400);
    throw new Error(error.message);
  }
});

const getDrink = expressAsyncHandler(async (req, res) => {
  try{
    const drink = await drinkModel.findOne({_id:req.params.drinkid})

    res.json(drink)
  } catch (error) {
    res.sendStatus(404)
    throw new Error('Botella no encontrada')
  }
})

const newDrink = expressAsyncHandler(async (req, res) => {
  const { name, price, cuantity } = req.body;

  if (!name || !price || !cuantity) {
    res.sendStatus(400);
    throw new Error("No se han rellenado todos los datos");
  }

  const drinkExists = await drinkModel.findOne({ name, cuantity });
  if (drinkExists) {
    res.sendStatus(405);
    throw new Error("La bebida ya existe");
  }

  const drink = await drinkModel.create({ name, price, cuantity });

  if (drink) {
    console.log("created:", drink);
    res.json({
      _id: drink._id,
      name: drink.name,
      price: drink.price,
      cuantity: drink.cuantity,
    });
  } else {
    res.sendStatus(400);
    throw new Error("Creacion fallido");
  }
});

const editDrink = expressAsyncHandler(async (req, res) => {
  const { _id, name, price, cuantity } = req.body;

  const drinkExists = await drinkModel.findOne({ name, cuantity, price });
  if (drinkExists) {
    res.sendStatus(405);
    throw new Error("La bebida ya existe");
  }

  try {
    const drink = await drinkModel.updateOne(
      { _id },
      { $set: { name, price, cuantity } }
    );
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
    throw new Error("Error actualizando:", error.message);
  }
});

const deleteDrink = expressAsyncHandler(async (req, res) => {
  const _id = req.body

  try {
    const drink = await drinkModel.deleteOne({_id})

    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(404)
    throw new Error('Error eliminando', error.message)
  }
})

module.exports = { allDrinks, newDrink, editDrink, getDrink, deleteDrink };
