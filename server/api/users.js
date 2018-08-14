const router = require('express').Router()
const Sequelize = require('sequelize')
const { User } = require('../db/models')
const Op = Sequelize.Op

module.exports = router

// GET /api/users/:query
router.get('/:query', async (req, res, next) => {
	try {
		const users = await User.findAll({
			where: {
				userName: { [Op.iLike]: req.params.query + '%' }
			}
		})
		res.json(users)
	} catch (err) {
		next(err)
	}
})
