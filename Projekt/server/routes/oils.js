const router = require("express").Router()
const { getOil , getOils} = require("../controllers/oilController")

router.route('/').get(getOils)
router.route('/:id').get(getOil)

module.exports = router