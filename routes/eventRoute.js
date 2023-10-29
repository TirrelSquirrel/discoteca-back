const express = require('express')
const {allEvents, newEvent, editEvent, getEvent} = require('../controllers/eventController')

const router = express.Router()

router.route('/').get(allEvents)
router.route('/').post(newEvent)
router.route('/').put(editEvent)
router.route('/:eventid').get(getEvent)

module.exports = router