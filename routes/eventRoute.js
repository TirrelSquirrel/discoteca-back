const express = require('express')
const {allEvents, newEvent, editEvent, getEvent, deleteEvent} = require('../controllers/eventController')

const router = express.Router()

router.route('/').get(allEvents)
router.route('/').post(newEvent)
router.route('/').put(editEvent)
router.route('/:eventid').get(getEvent)
router.route('/delete').put(deleteEvent)

module.exports = router