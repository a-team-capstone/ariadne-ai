const router = require('express').Router()
const { User, Maze, Play } = require('../db/models')

module.exports = router

// middleware checks that req.user.id (from passport deserialize user)
// matches req.params.id
router.use('/:id', (req, res, next) => {
	try {
		if (req.user.id === +req.params.id) {
			return next()
		} else {
			const error = new Error('Not Authorized')
			error.status = 403
			return next(error)
		}
	} catch (err) {
		next(err)
	}
})

// GET /api/user/:id/friends
// returns user with friends eager loaded, should it just return friends?
router.get('/:id/friends', async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id, {
			include: [
				{
					model: User,
					as: 'friend'
				}
			]
    })
    console.log('friends here?', user.friends)
		res.json(user)
	} catch (err) {
		next(err)
	}
})

// GET /api/user/:id
// returns user
router.get('/:id', async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id)
		if (!user) {
			const error = new Error('No User Found')
			error.status = 404
			return next(error)
		}
		res.json(user)
	} catch (err) {
		next(err)
	}
})

// PUT /api/user/:id/friends
// gets user, gets other user, adds other user as friend to OG user
router.put('/:id/friends', async (req, res, next) => {
	try {
		const friend = req.body
		const user = await User.findById(req.params.id)
		const newFriend = await User.findById(friend.id)
		await user.addFriend(newFriend)
		res.sendStatus(200)
	} catch (err) {
		next(err)
	}
})

// PUT /api/user/:id
// updates user information with req.body (should secure this by passing in
// specific attributes only)
router.put('/:id', async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id)
		const updatedUser = await user.update(req.body)
		res.json(updatedUser)
	} catch (err) {
		next(err)
	}
})

// DELETE /api/user/:id/:friendId
// removes a friend assosciation between two users
router.delete('/:id/:friendId', async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id)
		const friend = await User.findById(req.params.friendId)
		await user.removeFriend(friend)
		res.sendStatus(204)
	} catch (err) {
		next(err)
	}
})

// GET /api/user/:id/mazes
// gets all mazes created by a specific user
router.get('/:id/mazes', async (req, res, next) => {
	try {
		const mazes = await Maze.findAll({
			where: {
				userId: req.params.id
			}
		})
		res.json(mazes)
	} catch (err) {
		next(err)
	}
})

// GET /api/user/:id/challenges
// SHOULD THIS BE CHANGED TO GET ALL PLAYS, FILTER ON FRONT END?

// gets all challenges for a specific user
// where challenges = plays where attempted = false
// eager loads information about who sent challenge + maze details
router.get('/:id/challenges', async (req, res, next) => {
  try {
    const challenges = await Play.findAll({
      where: {
        playerId: req.params.id,
        attempted: false
      },
      include: [{
        model: Maze,
        attributes: ['name', 'id'],
        include: [{
          model: User,
          attributes: ['userName']
        }]
      }]
    })
    res.json(challenges)
  } catch (err) {
    next(err)
  }
})
