const db = require('../server/db')
const {User, Maze, Play} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('Database synced!')

  const users = await Promise.all([
    User.create({
      userName: 'CodyTheCuti3',
      email: 'cody@email.com',
      password: '123',
      admin: false
    }),
    User.create({
      userName: 'devinTheDev',
      email: 'devin@email.com',
      password: '456',
      admin: false
    }),
    User.create({
      userName: 'KehindeWiley',
      email: 'artist@email.com',
      password: 'art',
      admin: true
    }),
    User.create({
      email: 'goober@email.com',
      password: 'goob',
      admin: false
    }),
    User.create({
      email: 'morgan@email.com',
      password: 'morgan',
      admin: false
    }),
    User.create({
      email: 'Kendall@email.com',
      password: 'kendall',
      admin: false
    }),
    User.create({
      email: 'Dylan@email.com',
      password: 'dylan',
      admin: false
    }),
    User.create({
      email: 'Kyle@email.com',
      password: 'kyle',
      admin: false
    }),
    User.create({
      email: 'Bill@email.com',
      password: 'bill',
      admin: false
    }),
    User.create({
      email: 'pete@email.com',
      password: 'pete',
      admin: false
    }),
    User.create({
      email: 'j4wdin@email.com',
      password: 'j4wdin',
      admin: false
    }),
    User.create({
      email: 'p00lSh4rk@email.com',
      password: '123',
      admin: false
    })
  ])

  const mazes = await Promise.all([
    Maze.create({
      name: 'Infinite Loop',
      image: 'shelbyMaze.jpg',
      solvable: true
    }),
    Maze.create({
      name: 'Ursa Major',
      image: 'shelbyMazeUnsolvable.jpg',
      solvable: false
    }),
    Maze.create({
      name: 'The Claw',
      image: 'danMaze2.jpg',
      solvable: true
    }),
    Maze.create({
      name: 'Bludgeon',
      image: 'danMaze.jpg',
      solvable: true
    })
  ])

  await Promise.all([
    Play.bulkCreate([{
      seconds: 25,
      attempted: true,
      playerId: 1,
      mazeId: 3
    },
    {
      seconds: 20,
      attempted: true,
      playerId: 4,
      mazeId: 4
    },
    {
      attempted: false,
      playerId: 2,
      mazeId: 1
    },
    {
      seconds: 15,
      attempted: true,
      playerId: 3,
      mazeId: 4
    }])
  ])

  // friends 0-11
  await Promise.all([
    mazes[0].setUser(users[0]),
    mazes[1].setUser(users[0]),
    mazes[2].setUser(users[2]),
    mazes[3].setUser(users[3])
  ])

  await Promise.all([
    users[0].addFriend(users[3]),
    users[0].addFriend(users[2]),
    users[2].addFriend(users[1]),
    users[1].addFriend(users[3]),
    users[8].addFriend(users[5]),
    users[5].addFriend(users[8]),
    users[6].addFriend(users[9]),
    users[9].addFriend(users[11]),
    users[11].addFriend(users[6]),
    users[11].addFriend(users[1]),
    users[1].addFriend(users[10]),
    users[8].addFriend(users[10]),
    users[4].addFriend(users[5]),
    users[4].addFriend(users[9]),
    users[4].addFriend(users[11]),
    users[4].addFriend(users[6])
  ])
}

const runSeed = async () => {
  console.log('seeding..')
  try {
    await seed()
  } catch (err) {
    console.log(err.message)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
