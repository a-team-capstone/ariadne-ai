const Sequelize = require('sequelize')
const db = require('../db')
const makeMatrix = require('../../utilities/makeMatrix')

const Maze = db.define('maze', {
	image: {
		type: Sequelize.STRING,
		unique: true
	},
	solveable: {
		type: Sequelize.BOOLEAN
	},
	data: {
    type: Sequelize.TEXT,
    get () {
      return makeMatrix(this.getDataValue('data'))
    },
    set (matrix) {
      this.setDataValue('data', matrix.reduce((acc, curr) => {
        acc = acc.concat(curr)
        return acc
      }, []).join(''))
    }
	}
})

// setter takes a matrix and sets 'data' value on maze instance as a binary string
// getter returns the binary string in its matrix format

module.exports = Maze
