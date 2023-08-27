const express = require("express")
const { create_Shoe,buy ,get_Shoes ,get_Shoe,addReview} = require("../Controllers/ShoeControler")

const router = express.Router()


router.get('/', get_Shoes)
router.get('/:id', get_Shoe)
router.post('/create', create_Shoe)
router.patch('/buy/:id', buy)
router.patch('/reviews/:id', addReview)

module.exports = router