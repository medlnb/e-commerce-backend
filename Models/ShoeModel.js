const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ShoeModel = new Schema({
  model: {
    type: String,
    reuiqred:true
  },
  brand: {
    type: String,
    required:true
  },
  category: {
    type: Array,
    required:true
  },
  color: {
    type: String,
    required:true
  },
  size: {
    type: Number,
    required:true
  },
  img: {
    type: String,
    required:true
  },
  country: {
    type: String,
    required: true
  },
   price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required:true
   },
  description: {
    type:String
  },
  gender: {
    type: Array
  },
  Material: {
    type:String
  },
  reviews: {
    type: Array,
  }
}, { timestamps: true })
module.exports = mongoose.model("Shoe",ShoeModel)