const router = require('express').Router()
const Sequelize = require('sequelize')
const { User } = require('../db/models')
const Op = Sequelize.Op

module.exports = router

// need middleware to check for admin status, secure all user info

// GET /api/users/
// gets all users in the database
router.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.findAll()
    res.json(allUsers)
  } catch (err) {
    next(err)
  }
})
