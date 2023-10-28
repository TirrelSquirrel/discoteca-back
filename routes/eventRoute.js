const express = require('express')
const {allEvents, newEvent, editEvent} = require('../controllers/eventController')

const router = express.Router()

router.route('/').get(allEvents)
router.route('/').post(newEvent)
router.route('/').put(editEvent)

module.exports = router