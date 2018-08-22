const Sequelize = require('sequelize')
const db = require('../db')
const makeMatrix = require('../../utilities/makeMatrix')
const generateName = require('../../utilities/randomNames')

const Maze = db.define('maze', {
	name: {
		type: Sequelize.STRING
	},
	image: {
		type: Sequelize.STRING,
		unique: true
	},
	solvable: {
		type: Sequelize.BOOLEAN
	},
	data: {
    type: Sequelize.TEXT,
    get () {
      if (this.getDataValue('data')) {
        return makeMatrix(this.getDataValue('data'))
      }
    },
    set (matrix) {
      if(typeof(matrix) === 'object'){
      this.setDataValue('data', matrix.reduce((acc, curr) => {
        acc = acc.concat(curr)
        return acc
      }, []).join('')) }
      else this.setDataValue('data', matrix)
    }
	},
  STA: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: [24, 24]
  },
  END: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: [744, 552]
  },
  BMB: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  XTM: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  FRZ: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  TEL: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  PRT: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  time: {
    type: Sequelize.INTEGER,
    defaultValue: 30
  }
})

// setter takes a matrix and sets 'data' value on maze instance as a binary string
// getter returns the binary string in its matrix format

Maze.beforeCreate(maze => {
	if(!maze.name) maze.name = generateName()
})

module.exports = Maze
