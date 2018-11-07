const router = require('express').Router()
const { Maze } = require('../db/models')
const analyzeText = require('../utilities/analyzeText')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = router

// GET /api/mazes/featured
router.get('/featured', async (req, res, next) => {
	try {
    const mazes = await Maze.findAll({
      where: {
        featured: true
      }
    })
    res.json(mazes)
	} catch (err) {
		next(err)
	}
})

// GET /api/mazes/:id
// gets a maze where mazeId matches req.params.id
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

// PUT /api/mazes/:id
// updates a maze to solvable if true
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

// POST /api/mazes/analyze
// analyzes maze for solvability
router.post('/analyze', async (req, res, next) => {
	try {
		const response = await analyzeText(req.body.image)
		res.send(response)
	} catch (err) {
		next(err)
	}
})

// DELETE /api/mazes/:id
// deletes specified maze
router.delete('/:id', async (req, res, next) => {
	try {
		const mazeToDelete = await Maze.findById(req.params.id)
		await mazeToDelete.destroy()
		res.sendStatus(204)
	} catch (err) {
		next(err)
	}
})

// POST /api/mazes
// creates a new maze with image and defaults set
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
