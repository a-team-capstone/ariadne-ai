const Sequelize = require('sequelize')
const db = require('../db')
const makeMatrix = require('../../utilities/makeMatrix')

const Maze = db.define('maze', {
  // name: {
  //   type: Sequelize.STRING,
  //   unique: true
  // },
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
	},
  ST: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: [1, 1]
  },
  END: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: [672, 576]
  },
  BM: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  XT: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  FZ: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  TEL: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  PRT: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  time: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  }
})

// setter takes a matrix and sets 'data' value on maze instance as a binary string
// getter returns the binary string in its matrix format

module.exports = Maze
