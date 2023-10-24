const express = require('express')
const {allDrinks, newDrink} = require('../controllers/drinkController')

const router = express.Router()

router.route('/').get(allDrinks)

router.route('/').post(newDrink)


module.exports = router