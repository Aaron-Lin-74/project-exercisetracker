const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({
  description: {
    type: String,
    require: true,
    trim: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'A username is required'],
    trim: true,
    maxLength: [30, 'A username should be less then 30 characters'],
  },
  count: Number,
  log: [ExerciseSchema],
})

module.exports = mongoose.model('User', UserSchema)
