const router = require('express').Router()
const { User, Maze, Play } = require('../db/models')

module.exports = router

//play routes:
//edit a play (change attempted status and score)
//post a play (when maze gets sent to someone)
//get your plays (ones sent to you but you didn't make)
//get highest and lowest scores

// POST /api/plays
router.post('/', async (req, res, next) => {
  try {
    const { seconds, playerId, mazeId } = req.body
    const play = await Play.create({
      attempted: true,
      seconds,
      playerId,
      mazeId
    })
    if (!play) {
      const error = new Error('Attempt at maze not recorded.')
      error.status = 400
      return next(error)
    }
    res.json(play)
  } catch (err) {
    next(err)
  }
})

// GET /api/plays/:id/challenges
router.get('/:id/challenges', async (req, res, next) => {
  try {
    const challenges = await Play.findAll({
      where: {
        playerId: req.params.id,
        attempted: false
      }
    })
    res.json(challenges)
  } catch (err) {
    next(err)
  }
})

// PUT /api/plays/
// router.put('/', async (req, res, next) => {
//   try {
    
//   } catch (err) {
//     next(err)
//   }
// })
