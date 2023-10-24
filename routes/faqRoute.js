const express = require('express')
const {allFaqs, newFaq} = require('../controllers/faqController') 

const router = express.Router()

router.route('/').get(allFaqs)

router.route('/').post(newFaq)

module.exports = router