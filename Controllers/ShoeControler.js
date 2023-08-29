const Shoe = require("../Models/ShoeModel")


const get_Shoes = async (req, res) => {
  try {
    const shoes = await Shoe.find({ quantity: { $gt: 0 } }).sort({ createdAt: -1 });
    // return res.status(201).json(shoes)
    const groupShoes = new Map();

    shoes.forEach((shoe) => {
      const { model, brand, country, price } = shoe;
      const info = `${model}_${brand}_${country}_${price}`
      
      if (!groupShoes.has(info)) {
        groupShoes.set(info, [])
      }
      groupShoes.get(info).push(shoe)
    });
    const result = [...groupShoes.entries()].map(([info, data]) => ({
      title: info,
      ShoeData: data,
    }));

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
}


const get_Shoe = async (req, res) => {
  try {
    const detected = await Shoe.findOne({ _id: req.params.id })
    const shoe = await Shoe.find({ model:detected.model, brand:detected.brand,price:detected.price })
    res.status(201).json(shoe)
  } catch (err) {
    res.status(501).json(err)
  }
}

const create_Shoe = async (req,res) => {
  const { model, brand,  color, size,  country,
    price}
    = req.body
  try {
    const exists = await Shoe.findOne({ model,brand, color, size, country, price })
    if (exists)
      return res.status(404).json({ err: "alrddy exists" })
    
    const shoe = await Shoe.create(req.body)
    if(shoe)
      return res.status(201).json(shoe)
    res.status(201).json({err:"Error create a Shoe"})
  } catch (err) {
    res.status(201).json(err)
  }
}


const buy = async (req, res) => {
  try {
    const exists = await Shoe.findOne({ _id: req.params.id }, {quantity:1,_id:0})
    if (exists.quantity < req.body.much)
      return res.status(404).json({err:`Only ${exists.quantity} left`})
    const shoe = await Shoe.findByIdAndUpdate({ _id: req.params.id }, { $inc: { quantity: -req.body.much } })
    res.status(201).json({result:"done"})
    
    } catch (err) {
    res.status(501).json(err)
  }
}

const addReview = async (req, res) => {
  try {
    const shoe = await Shoe.findOne({ _id: req.params.id })
    if (!shoe)
      return res.status(404).json({ err: "Can't find the shoe" })

    const newReview = {
      username: req.body.username,
      text: req.body.text,
      rating: req.body.rating, 
      createdAt: new Date(),
    }

    shoe.reviews.push(newReview)

    await shoe.save()

    res.status(201).json({ message: "Review added successfully", review: newReview })
    
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = { create_Shoe,buy,get_Shoes ,get_Shoe,addReview}