const express = require('express')
const {allFaqs, newFaq, editFaq, getFaq} = require('../controllers/faqController') 

const router = express.Router()

router.route('/').get(allFaqs)
router.route('/').post(newFaq)
router.route('/').put(editFaq)
router.route('/:faqid').get(getFaq)

module.exports = router