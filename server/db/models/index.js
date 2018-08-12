const User = require('./user')
const Maze = require('./maze')
const MazeData = require('./mazeData')
const Play = require('./Play')


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */


User.belongsToMany(User, { as: "friend", through: "Friends" })

User.hasMany(Maze)
Maze.belongsTo(User)

// MazeData.belongsTo(Maze)
// Maze.hasMany(MazeData)

User.belongsToMany(Maze, { as: "player", through: Play, foreignKey: "playerId"})
Maze.belongsToMany(User, {through: Play})


module.exports = {
  User,
  Maze,
  Play
}
