const router = require('express').Router()
const { User, Maze, Play } = require('../db/models')

module.exports = router

//play routes:
//edit a play (change attempted status and score)
//post a play (when maze gets sent to someone)
//get your plays (ones sent to you but you didn't make)
//get highest and lowest scores
