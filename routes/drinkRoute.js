const express = require('express')

const router = express.Router()

router.route('/').get(allDrinks)

router.route('/').post(newDrink)


module.exports = router