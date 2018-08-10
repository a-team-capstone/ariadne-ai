const Sequelize = require('sequelize');
const db = require('../db');

const MazeData = db.define('maze_data', {
  x: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  y: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  value: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = MazeData;
