const router = require('express').Router()
const { User, Maze, Play } = require('../db/models')

module.exports = router

//maze routes:
//get featured mazes
//get mazes for specific user (author)
//get single maze
//delete maze
//post a maze
//get all (or highest/lowest) plays for specific maze