const Sequelize = require('sequelize')
const db = require('../db')

const Play = db.define('play', {
	seconds: {
		type: Sequelize.INTEGER
	},
	attempted: {
		type: Sequelize.BOOLEAN
	}
})



module.exports = Play