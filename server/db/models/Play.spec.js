const { expect } = require('chai')
const db = require('../index')
const Play = db.model('play')

describe('Play model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('definitions', () => {
    describe('definitions', () => {
      let codyFirstPlay

      beforeEach(async () => {
        codyFirstPlay = await Play.create({
          seconds: 15,
          attempted: true
        })
      })

      it('sets id to a unique number', () => {
        expect(codyFirstPlay.id).to.be.a('number')
      })

      it('sets the status of attempted as true or false', () => {
        expect(codyFirstPlay.attempted).to.be.a('boolean')
      })

      it('sets the status of attempted correctly', () => {
        expect(codyFirstPlay.attempted).to.be.equal(true)
      })

      it('sets seconds to amount of time it takes to solve maze', () => {
        expect(codyFirstPlay.seconds).to.be.equal(15)
      })
    })
  })
})
