const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
  try {
    const user = await User.find().select({ username: 1, _id: 1 })

    res.json(user)
  } catch (err) {
    console.log(err)
  }
})

router.post('/', async (req, res) => {
  console.log(req.body)
  const user = new User({
    username: req.body.username,
  })
  try {
    const newUser = await user.save()
    res.status(201).json({ username: newUser.username, _id: newUser._id })
  } catch (err) {
    console.log(err)
  }
})

router.get('/all', async (req, res) => {
  try {
    const user = await User.find()
    res.json(user)
  } catch (err) {
    console.log(err)
  }
})

router.post('/:_id/exercises', getUser, async (req, res) => {
  const description = req.body.description
  const duration = req.body.duration
  let date = req.body.date
  if (date) {
    date = new Date(date).toDateString()
  } else {
    date = new Date().toDateString()
  }
  console.log(description, duration, date)
  const exercise = { description, duration, date }
  res.user.log.push(exercise)
  res.user.count += 1
  try {
    const updatedUser = await res.user.save()
    res.send({
      _id: updatedUser._id,
      username: updatedUser.username,
      date,
      duration,
      description,
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.get('/:id/logs', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user === null) {
      return res.status(404).json({ message: 'Could not find the user' })
    }
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/:_id', async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params._id)
    if (user === null) {
      return res.status(404).json({ message: 'Could not find the user' })
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getUser(req, res, next) {
  let user
  try {
    user = await User.findById(req.body[':_id'])
    if (user === null) {
      return res.status(404).json({ message: 'Could not find the user' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.user = user
  next()
}
module.exports = router
