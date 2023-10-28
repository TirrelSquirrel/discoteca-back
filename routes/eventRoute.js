const express = require('express')
const {allEvents, newEvent} = require('../controllers/eventController')

const router = express.Router()

router.route('/').get(allEvents)
router.route('/').post(newEvent)

module.exports = router