const Order = require("../Models/OrderModel")

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({email:req.params.email}).sort({ createdAt: -1 })
    
    res.status(201).json(orders)
  } catch (err) {
    res.status(501).json(err)
  }
}
const changeQuantity = async (req, res) => {
  const {valeur} = req.body
  try {
    const exists = await Order.updateOne({ _id: req.params.id }, { $inc: { quantity: valeur } })
    if (!exists)
      return res.status(401).json({ err: "order doesnt exists" })
    res.status(201).json(exists)
  } catch (err) {
    res.status(501).json(err)
  }
}

const createOrder = async (req, res) => {
  try {
    const exists = await Order.findOne(req.body )
    if ( exists)
      return res.status(404).json({ err:"alrddy exists"})
    
    const order = await Order.create(req.body)
    
    if(!order)
      res.status(405).json({ err: "error creating the order" })
    
    res.status(201).json(order)
  } catch (err) {
    res.status(501).json(err)
  }
}
const payOrder = async (req, res) => {
  try {
    const exists = await Order.findByIdAndUpdate({ _id: req.params.id }, { payed: true })
    if (!exists)
      return res.status(401).json({ err: "order doesnt exists" })
    res.status(401).json(exists)
  } catch (err) {
    res.status(501).json(err)
  }
}
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete({ _id: req.params.id })
    if (!order)
      return res.status(401).json({ err: "order doesnt exists" })
    res.status(201).json(order)
  } catch (err) {
    res.status(501).json(err)
  }
}

module.exports = { createOrder, payOrder,deleteOrder, getOrders,changeQuantity }