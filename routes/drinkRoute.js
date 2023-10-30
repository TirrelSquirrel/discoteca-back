const express = require("express");
const {
  allDrinks,
  newDrink,
  editDrink,
  getDrink,
  deleteDrink
} = require("../controllers/drinkController");

const router = express.Router();

router.route("/").get(allDrinks);
router.route("/").post(newDrink);
router.route("/").put(editDrink);
router.route('/:drinkid').get(getDrink)
router.route('/delete').put(deleteDrink)


module.exports = router;
