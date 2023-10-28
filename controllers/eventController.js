const expressAsyncHandler = require("express-async-handler");
const eventModel = require("../models/eventModel");

const allEvents = expressAsyncHandler(async (req, res) => {
  try {
    const eventList = await eventModel.find();
    res.json(eventList);
  } catch (error) {
    res.sendStatus(400);
    throw new Error(error.message);
  }
});

const formatDate = (date) => {
  let dateArray = date.split("-");
  dateArray[2] = dateArray[2].split("T");
  dateArray[2] = dateArray[2][0];
  dateArray.reverse();
  let dateString = dateArray.join("-");
  return dateString;
};

const newEvent = expressAsyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const date = formatDate(req.body.date);

  if (!title || !description || !date) {
    res.sendStatus(400);
    throw new Error("No se han rellenado todos los datos");
  }

  const eventExists = await eventModel.findOne({ title, date });

  if (eventTitleExists) {
    res.sendStatus(405);
    throw new Error("El evento ya existe");
  }

  const event = await eventModel.create({ title, description, date });

  if (event) {
    console.log("Created:", event);
    res.json({
      _id: event._id,
      title: event.title,
      description: event.description,
      date: event.date,
    });
  } else {
    res.sendStatus(400);
    throw new Error("Creación fallida");
  }
});

const editEvent = expressAsyncHandler(async (req, res) => {
  const { _id, title, description, date } = req.body;

  const eventExists = await eventModel.findOne({ title, date });

  if (eventTitleExists) {
    res.sendStatus(405);
    throw new Error("El evento ya existe");
  }

  try {
    const event = await eventModel.updateOne(
      { _id },
      { $set: { title, description, date } }
    );

    res.json(event);
  } catch (error) {
    res.sendStatus(400);
    throw new Error("Error actualizando:", error.message);
  }
});

module.exports = { allEvents, newEvent, editEvent };
