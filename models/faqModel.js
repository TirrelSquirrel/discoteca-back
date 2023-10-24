const mongoose = require('mongoose')

const faqModel = mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true}
})

const Faq = mongoose.model('FaQ', faqModel)

module.exports = Faq