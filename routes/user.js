const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
  try {
    const user = await User.find()

    res.json(user)
  } catch (err) {
    console.log(err)
  }
})

router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
  })
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    console.log(err)
  }
})
module.exports = router
