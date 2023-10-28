const express = require('express')
const {allFaqs, newFaq, editFaq} = require('../controllers/faqController') 

const router = express.Router()

router.route('/').get(allFaqs)
router.route('/').post(newFaq)
router.route('/').put(editFaq)

module.exports = router