const {expect} = require('chai')
const db = require('../index')
const Maze = db.model('maze')

describe('Maze model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('definitions', () => {
    describe('definitions', () => {
      let codyMaze

      beforeEach(async () => {
        codyMaze = await Maze.create({
          image: 'sketchMaze.jpg',
          solvable: true,
          data: '10110010101110010100'
        })
      })

      it('sets solvable to true', () => {
        expect(codyMaze.solvable).to.be.equal(true)
      })

      it('returns binary string for data', () => {
        expect(codyMaze.data).to.be.equal('10110010101110010100')
      })

      it('sets the image correctly', () => {
        expect(codyMaze.image).to.be.equal('sketchMaze.jpg')
      })
    }) 
  }) 
})