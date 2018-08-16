const db = require('../server/db')
const { User, Maze, Play } = require('../server/db/models')
// const {shelbyMaze} = require('../client/src/mazeGrids/10px_tiles')

async function seed() {
	await db.sync({ force: true })
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
		})
	])

	const mazes = await Promise.all([
		Maze.create({
			image: 'shelbyMaze.jpg',
			solveable: true
		}),
		Maze.create({
			image: 'shelbyMazeUnsolveable.jpg',
			solveable: false
		}),
		Maze.create({
			image: 'danMaze2.jpg',
			solveable: true
		}),
		Maze.create({
			image: 'danMaze.jpg',
			solveable: true
		})
	])

	await Promise.all([
		Play.bulkCreate([
			{
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
			}
		])
	])

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
		users[1].addFriend(users[3])
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
