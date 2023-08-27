const mongoose = require("mongoose")

const Schema = mongoose.Schema

const OrderSchema = new Schema({
  email: {
    type: String,
    required:true
  },
  model: {
    type: String,
    required:true
  },
  color: {
    type: String,
    required:true
  },
  size: {
    type: Number,
    require:true
  },
  price: {
    type: Number,
    required:true
  },
  payed: {
    type: Boolean,
    required:true
  },
  quantity: {
    type: Number,
    required:true
  },
  img: {
    type: String,
    required:true
  }
},{ timestamps: true })

module.exports = mongoose.model("Order",OrderSchema)