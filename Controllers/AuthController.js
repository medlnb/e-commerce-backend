const User = require("../Models/AuthModel")
const jwt = require("jsonwebtoken")



const createToken = (_id) => {
  return jwt.sign({_id},process.env.SECRET, {expiresIn : '3d'})
}
const Log_in = async (req,res) => {
  const { email, password } = req.body
  
  try {
    const exists = await User.findOne({ email })

    if (!exists)
      return res.status(401).json({ email_err: "email doesnt exists" })
    
    if (exists.password != password) 
      return res.status(401).json({ pw_err: "wrong password" })
    
    const token = createToken(exists._id)
    res.status(201).json({ username: exists.username,email, token })
    
  } catch (err) {
    
  }
  
}
const Sign_up = async (req,res) => {
  const { email} = req.body
  
  try {
    
    const exists = await User.findOne({ email })
    
    if (exists)
      return res.status(402).json({ err: "email already exists" })

   const user = await User.create(req.body)

    if (user) {
      const token = createToken(user._id)
      return res.status(201).json({ user: user.username,email,token })
    }
    
  } catch (err) {
    
    res.status(501).json(err)
  }
}

module.exports = {
  Log_in,Sign_up
}