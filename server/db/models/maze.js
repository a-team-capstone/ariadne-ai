const Sequelize = require('sequelize')
const db = require('../db')

const Maze = db.define('maze', {
	image: {
		type: Sequelize.STRING,
		unique: true
	},
	solveable: {
		type: Sequelize.BOOLEAN
	}
})


module.exports = Maze
