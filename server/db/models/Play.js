const Sequelize = require('sequelize')
const db = require('../db')

const Play = db.define('play', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
	seconds: {
		type: Sequelize.INTEGER
	},
	attempted: {
		type: Sequelize.BOOLEAN
	}
})

module.exports = Play
