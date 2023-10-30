const expressAsyncHandler = require("express-async-handler");
const faqModel = require("../models/faqModel");

const allFaqs = expressAsyncHandler(async (req, res) => {
  try {
    const faqList = await faqModel.find();
    res.json(faqList);
  } catch (error) {
    res.sendStatus(400);
    throw new Error(error.message);
  }
});

const getFaq = expressAsyncHandler(async (req, res) => {
  try {
    const faq = await faqModel.findOne({_id:req.params.faqid})
    res.json(faq)
  } catch (error) {
    res.sendStatus(4040)
    throw new Error('FAQ no encontrado')
  }
})

const newFaq = expressAsyncHandler(async (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    res.sendStatus(400);
    throw new Error("No se han rellenado todos los datos");
  }

  const faqExists = await faqModel.findOne({ question });
  if (faqExists) {
    res.sendStatus(405);
    throw new Error("La pregunta ya existe");
  }

  const faq = await faqModel.create({ question, answer });

  if (faq) {
    console.log("created:", faq);
    res.json({
      _id: faq._id,
      question: faq.question,
      answer: faq.answer,
    });
  } else {
    res.sendStatus(400);
    throw new Error("Creación fallida");
  }
});

const editFaq = expressAsyncHandler(async (req, res) => {
  const { _id, question, answer } = req.body;

  const faqExists = await faqModel.findOne({ question });
  if (faqExists) {
    res.sendStatus(405);
    throw new Error("La pregunta ya existe");
  }

  try {
    const faq = await faqModel.updateOne(
      { _id },
      { $set: { question, answer } }
    );
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
    throw new Error("Error actualizando:", error.message);
  }
});

const deleteFaq = expressAsyncHandler(async (req, res) => {
  const _id = req.body;

  try {
    const faq = await faqModel.deleteOne({ _id });

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
    throw new Error("Error eliminando", error.message);
  }
});

module.exports = { allFaqs, newFaq, editFaq, getFaq, deleteFaq };
