const router = require('express').Router()
const { User, Maze, Play } = require('../db/models')

module.exports = router

//play routes:
//edit a play (change attempted status to true)
//post a play (when challenge is sent)
//post a play (when somebody plays a maze)
//get your plays (ones sent to you but you didn't make)


// POST /api/plays/challenge (sending a challenge)
// need to send playerId (being challenged) & mazeId (maze they will play) on req.body
router.post('/challenge', async (req, res, next) => {
  try {
    const { playerId, mazeId } = req.body
    const challenge = await Play.create({
      attempted: false,
      seconds: null,
      playerId,
      mazeId
    })
    if (!challenge) {
      const error = new Error('Unable to send challenge!')
      error.status = 400
      return next(error)
    }
    res.json(challenge)
  } catch (err) {
    next(err)
  }
})

// POST /api/plays (maze attempt)
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
// Do we want to include the maze name? Will it exist by demo day?
// Include model User off of maze, send back the user Name and Image? Just name?
router.get('/:id/challenges', async (req, res, next) => {
  try {
    const challenges = await Play.findAll({
      where: {
        playerId: req.params.id,
        attempted: false
      },
      include: [{
        model: Maze,
        attributes: ['image'],
        include: [{
          model: User,
          attributes: ['userName']
        }]
      }]
    })
    // const response = []
    res.json(challenges)
  } catch (err) {
    next(err)
  }
})

// PUT /api/plays/
router.put('/:id', async (req, res, next) => {
  try {
    const play = await Play.findById(req.params.id)
    const updated = await play.update({
      attempted: true
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})
