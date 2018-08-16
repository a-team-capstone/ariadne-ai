const User = require('./user')
const Maze = require('./maze')
const Play = require('./Play')

User.belongsToMany(User, { as: 'friend', through: 'Friends' })

User.hasMany(Maze)
Maze.belongsTo(User)

User.belongsToMany(Maze, { as: 'player', through: Play, foreignKey: 'playerId'})
Maze.belongsToMany(User, {through: Play})

module.exports = {
  User,
  Maze,
  Play
}
