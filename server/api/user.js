const router = require('express').Router()
const { User, Maze } = require('../db/models')

module.exports = router

//write a middleware first that checks if req.user matches req.params.userId
//get personal account information
//get friends
//put (edit) personal info
//remove friend
//get mazes where you are high scorer
//get your highest scores
//get your badges

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

router.put('/:id', async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id)
		const updatedUser = await user.update(req.body)
		res.json(updatedUser)
	} catch (err) {
		next(err)
	}
})

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
		res.json(user)
	} catch (err) {
		next(err)
	}
})

// router.get('/:id/friends', async (req, res, next) => {
// 	try {
// 		const user = await User.findById(req.params.id)
// 		const friends = await user.getFriends()
// 		res.json(friends)
// 	} catch (err) {
// 		next(err)
// 	}
// })

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

router.get('/:id/mazes', async (req, res, next) => {
	try {
		const mazes = Maze.findAll({
			where: {
				userId: req.params.id
			}
		})
		res.json(mazes)
	} catch (err) {
		next(err)
	}
})
