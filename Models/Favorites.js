const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FavModel = new Schema({
  email: {
    type: String,
    required : true
  },
  shoeId: {
    type: String,
    required:true
  }
})

module.exports = mongoose.model("Fav",FavModel)