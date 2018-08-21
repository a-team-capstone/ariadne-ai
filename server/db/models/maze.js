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
      this.setDataValue('data', matrix.reduce((acc, curr) => {
        acc = acc.concat(curr)
        return acc
      }, []).join(''))
    }
	},
  STA: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  END: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
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
    type: Sequelize.INTEGER
  }
})

// setter takes a matrix and sets 'data' value on maze instance as a binary string
// getter returns the binary string in its matrix format

module.exports = Maze
