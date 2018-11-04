const router = require('express').Router()
module.exports = router

router.use('/uploads', require('./uploads'))
router.use('/user', require('./user'))
router.use('/mazes', require('./mazes'))
router.use('/users', require('./users'))
router.use('/plays', require('./plays'))

router.use((req, res, next) => {
	const error = new Error('Not Found')
	error.status = 404
	next(error)
})
