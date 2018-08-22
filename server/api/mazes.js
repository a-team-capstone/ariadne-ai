const router = require('express').Router()
const { User, Maze, Play } = require('../db/models')
const analyzeText = require('../utilities/analyzeText')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = router

//maze routes:
//get featured mazes
//get single maze
//update a maze to solvable
//delete maze
//post a maze
//get all (or highest/lowest) plays for specific maze

router.get('/featured', async (req, res, next) => {
	try {
    const mazes = await Maze.findAll({
      where: {
        data: {
          [Op.ne]: null
        }
      }
    })
    res.json(mazes)
	} catch (err) {
		next(err)
	}
})

router.get('/:id', async (req, res, next) => {
	try {
		const maze = await Maze.findById(req.params.id)
		if (!maze) {
			const error = new Error('Maze not found!')
			error.status = 404
			return next(error)
		}
		res.json(maze)
	} catch (err) {
		next(err)
	}
})

router.put('/:id', async (req, res, next) => {
  try {
    const maze = await Maze.findById(req.params.id)
    if (!maze) {
      const error = new Error('Maze not found!')
			error.status = 404
			return next(error)
    }
    const updated = await maze.update({
      solvable: true
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

router.post('/analyze', async (req, res, next) => {
	try {
		const response = await analyzeText(req.body.image)
		res.send(response)
	} catch (err) {
		next(err)
	}
})

// router.get('/:id/best', async (req, res, next) => {
// 	try {
// 		const sorted = allPlays.sort( (a, b) => a.seconds - b.seconds )
// 		const best = sorted.slice(0, 3)
// 		res.json(best)
// 	} catch (err) {
// 		next(err)
// 	}
// })

router.delete('/:id', async (req, res, next) => {
	try {
		const mazeToDelete = await Maze.findById(req.params.id)
		await mazeToDelete.destroy()
		res.sendStatus(204)
	} catch (err) {
		next(err)
	}
})

router.post('/', async (req, res, next) => {
	try {
		const [ maze, wasCreated ] = await Maze.findOrCreate({
			where: {
				image: req.body.image
			},
			defaults: {
					image: req.body.image,
					solvable: req.body.solvable,
					data: req.body.data,
					userId: req.body.userId,
					STA: req.body.STA,
					END: req.body.END,
					BMB: req.body.BMB,
					XTM: req.body.XTM,
					FRZ: req.body.FRZ,
					TEL: req.body.TEL,
					PRT: req.body.PRT,
					SLD: req.body.SLD,
					WPN: req.body.WPN,
					time: req.body.time
				}
			})
		res.json(maze)
	} catch (err) {
		next(err)
	}
})
