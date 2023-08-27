const express = require('express')
const {getFavs,HandleFav} = require('../Controllers/FavoritesController')

const router = express.Router()

router.post('/',HandleFav)
router.get("/:email",getFavs)

module.exports = router