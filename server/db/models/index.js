const User = require('./user')
const Maze = require('./maze')
const Play = require('./Play')

User.belongsToMany(User, { as: 'friend', through: 'Friends' })

User.hasMany(Maze)
Maze.belongsTo(User)

// User.belongsToMany(Maze, { as: 'player', through: Play, unique: false, foreignKey: 'playerId'})
// Maze.belongsToMany(User, { through: Play })

User.hasMany(Play, { as: 'player', foreignKey: 'playerId'})
Maze.hasMany(Play)

Play.belongsTo(Maze)

module.exports = {
  User,
  Maze,
  Play
}
