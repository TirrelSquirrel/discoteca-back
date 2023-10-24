const expressAsyncHandler = require('express-async-handler')
const faqModel = require('../models/faqModel')

const allFaqs = expressAsyncHandler(async (req, res) => {
    try {
        const faqList = await faqModel.find()
        res.json(faqList)
    } catch (error) {
        res.sendStatus(400)
        throw new Error(error.message)
    }
})

const newFaq = expressAsyncHandler(async (req, res) => {
    const {question, answer} = req.body;

    if(!question || !answer) {
        res.sendStatus(400)
        throw new Error('No se han rellenado todos los datos')
    }

    const faqExists = await faqModel.findOne({question})
    if (faqExists) {
        res.sendStatus(405)
        throw new Error('La pregunta ya existe')
    }

    const faq = await faqModel.create({question, answer});

    if (faq) {
        console.log('created:', faq)
        res.json({
            _id: faq._id,
            question: faq.question,
            answer: faq.answer
        })
    } else {
        res.sendStatus(400)
        throw new Error('Creación fallida')
    }
})

module.exports = {allFaqs, newFaq}