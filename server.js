const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const AuthRouter = require("./Routers/AuthRouter")
const ShoeRouter = require("./Routers/ShoeRouter")
const OrderRouter = require('./Routers/OrderRouter')
const FavoritesRouter = require('./Routers/Favorites')

require("dotenv").config()



const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/user", AuthRouter)
app.use("/api/shoe", ShoeRouter)
app.use('/api/favorites',FavoritesRouter)
app.use("/api/order",OrderRouter)

mongoose.connect(process.env.MONGO_URI)
  .then(
    app.listen(process.env.PORT, () => {
    console.log("connected to db and live on some port")
  })
)
