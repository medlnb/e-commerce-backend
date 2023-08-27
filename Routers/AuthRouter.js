const express = require("express")
const{ Log_in,Sign_up }= require('../Controllers/AuthController')
const router = express.Router()

router.post('/login', Log_in)
router.post('/signup',Sign_up)

module.exports = router