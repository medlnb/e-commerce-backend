const Fav = require('../Models/Favorites')

const getFavs = async (req, res) => {
  try {
    const favs = await Fav.find({ email: req.params.email }, { shoeId: 1, _id: 0 })
    const favos = []
    favs.map(fav => {
      favos.push(fav.shoeId)
    })
    res.status(201).json(favos)
  } catch (err) {
    res.status(501).json(err )
  }
}
const HandleFav = async (req, res) => {
  try {
    const exists = await Fav.findOne(req.body)

    if (exists.length) {
      const _delete = await Fav.findOneAndRemove(req.body)
      res.status(201).json(_delete)
      return
    }
    
    const fav = await Fav.create(req.body)
    if(fav)
      return res.status(201).json(fav)
  } catch (err) {
    res.status(501).json( err )
    
  }
}

module.exports = {getFavs,HandleFav}