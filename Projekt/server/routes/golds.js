const router = require("express").Router()
const { getGold , getGolds} = require("../controllers/goldController")

router.route('/').get(getGolds)
router.route('/:id').get(getGold)

module.exports = router