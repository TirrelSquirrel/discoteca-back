const express = require('express')

const router = express.Router()

router.route('/').get(allDrinks)


module.exports = router