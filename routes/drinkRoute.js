const express = require('express')
const {allDrinks, newDrink, editDrink} = require('../controllers/drinkController')

const router = express.Router()

router.route('/').get(allDrinks)
router.route('/').post(newDrink)
router.route('/').put(editDrink)


module.exports = router