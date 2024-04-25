const router = require("express").Router()
const { getWar, getWars } = require("../controllers/warsController")

router.route('/').get(getWars)
router.route('/:id').get(getWar)

module.exports = router