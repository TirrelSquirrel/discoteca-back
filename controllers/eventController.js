const expressAsyncHandler = require('express-async-handler')
const eventModel = require('../models/eventModel')

const allEvents = expressAsyncHandler(async (req, res) => {
    try {
        const eventList = await eventModel.find()
        res.json(eventList)
    } catch (error) {
        res.sendStatus(400)
        throw new Error(error.message)
    }
})

const newEvent = expressAsyncHandler(async (req, res) => {
    const {title, description, date} = req.body

    if (!title || !description || !date) {
        res.sendStatus(400)
        throw new Error('No se han rellenado todos los datos')
    }

    const eventTitleExists = await eventModel.finOne({title})
    const eventDateExists = await eventModel.finOne({date})

    if(eventTitleExists && eventDateExists) {
        res.sendStatus(405)
        throw new Error('El evento ya existe')
    }

    const event = await eventModel.create({title, description, date})

    if (event) {
        console.log('Created:', event)
        res.json({
            _id: event._id,
            title: event.title,
            description: event.description,
            date: event.date
        })
    } else {
        res.sendStatus(400)
        throw new Error('Creación fallida')
    }
})

module.exports = {allEvents, newEvent}