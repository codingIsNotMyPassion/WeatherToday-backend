const router = require("express").Router()
const currentApi = require("../controllers/currentApi")
const forecastApi = require("../controllers/forecastApi")

router.get("/current/:loc", currentApi)
router.get("/forecast/:loc", forecastApi)

module.exports = router