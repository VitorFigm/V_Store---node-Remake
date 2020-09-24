const express = require('express')
const router = express.Router()
const views = require('./views')


router.get("/",views.home)
router.get("/filter",views.filter)
router.get("/:page/filter",views.filter)
router.get("/:page",views.home)





module.exports = router