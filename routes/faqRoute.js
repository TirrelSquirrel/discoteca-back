const express = require('express')
const {allFaqs, newFaq, editFaq, getFaq, deleteFaq} = require('../controllers/faqController') 

const router = express.Router()

router.route('/').get(allFaqs)
router.route('/').post(newFaq)
router.route('/').put(editFaq)
router.route('/:faqid').get(getFaq)
router.route('/delete').put(deleteFaq)

module.exports = router