const router = require('express').Router()
const { Play } = require('../db/models')

module.exports = router

// POST /api/plays/challenge (sending a challenge)
// need to send playerId (being challenged) &
// mazeId (maze they will play) on req.body
router.post('/challenge', async (req, res, next) => {
  try {
    await Play.bulkCreate(req.body)
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

// POST /api/plays
// created every time user makes new attempt at solving maze
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

// PUT /api/plays/
// updates a play (challenge) to attempted status
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
