const express = require("express")
const { createOrder, payOrder, deleteOrder, getOrders, changeQuantity } = require('../Controllers/OrderController')
const RequireAuth = require('../MiddleWare/RequiredAuth')

const router = express.Router()


router.use(RequireAuth)

router.post("/create",createOrder)
router.patch("/pay/:id", payOrder)
router.delete("/delete/:id", deleteOrder)
router.get("/:email", getOrders)
router.patch("/quantity/:id",changeQuantity)

module.exports = router