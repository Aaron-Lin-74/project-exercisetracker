const express = require('express')
const router = express.Router()

const {
  getUsers,
  createUser,
  getAllUsersDetails,
  createUserExercise,
  getUserLogs,
  deleteUser,
  findAUser,
} = require('../controllers/user')
router.get('/', getUsers)

router.post('/', createUser)

router.get('/all', getAllUsersDetails)

router.post('/:_id/exercises', findAUser, createUserExercise)

router.get('/:_id/logs', findAUser, getUserLogs)

router.delete('/:_id', deleteUser)

module.exports = router
