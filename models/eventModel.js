const mongoose = require('mongoose')

const eventModel = mongoose.Schema({
    title: {type: String, required: true},
    description: {type:String, required: true},
    date: {type:String, required:true}
})

const Event = mongoose.model('Event', eventModel)

module.exports = Event